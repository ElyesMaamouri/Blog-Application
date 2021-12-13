module.exports = (app, pathApi) => {
  const articleControl = require("../controllers/manageArticles/articlesController");
  const uploadPicture = require("../middleware/file-upload");
  const passport = require("passport");
  const checkRoleUser = require("../middleware/chekRoleUser");

  /**
   * @swagger
   * components:
   *   schemas:
   *     Article:
   *       type: object
   *       required:
   *         - title
   *         - content
   *         - category
   *         - author
   *         - fileUpload
   *       properties:
   *         title:
   *           type: string
   *           description: Title of article
   *         content:
   *           type: string
   *           description: Content article
   *         category:
   *           type: string
   *           description: Category of article
   *         author:
   *           type: string
   *           description: Author of article
   *         fileUpload :
   *           type : file
   *           description : Picture of article
   *       example:
   *         title: Nintendo Switch OLED review
   *         content: A bigger, better display and an excellent kickstand make this a great handheld game system, but if you keep your Switch docked all the time, you'll never notice.
   *         category: 615d6cf4832ea9c685eb612c
   *         author : author
   *         fileUpload : picture.png
   */

  /**
   * @swagger
   * components:
   *   schemas:
   *     Update Article:
   *       type: object
   *       properties:
   *         title:
   *           type: string
   *           description: Title of article
   *         content:
   *           type: string
   *           description: Content article
   *         category:
   *           type: string
   *           description: Category of article
   *         author:
   *           type: string
   *           description: Author of article
   *         fileUpload :
   *           type : file
   *           description : Picture of article
   *       example:
   *         title: Nintendo Switch OLED review
   *         content: A bigger, better display and an excellent kickstand make this a great handheld game system, but if you keep your Switch docked all the time, you'll never notice.
   *         category: 615d6cf4832ea9c685eb612c
   *         author : author
   *         fileUpload : picture.png
   */

  /**
   * @swagger
   * components:
   *     securitySchemes:
   *        bearerAuth:
   *          type: http
   *          scheme: bearer
   */

  /**
   * @swagger
   * tags :
   *  name : Blog
   *  description : Blog api
   */

  /**
   * @swagger
   * /api/articles:
   *   post:
   *     security:
   *       - bearerAuth: []
   *     summary: Create a new article
   *     tags: [Blog]
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type : object
   *             $ref : '#/components/schemas/Article'
   *     responses:
   *       201:
   *         description: Your article has been successfully created
   *       401 :
   *         description: Unauthorized
   *       500 :
   *         description: An error occurred saving your article
   */
  app.post(
    pathApi + "/articles",
    passport.authenticate("jwt", { session: false }),
    uploadPicture.upload,
    articleControl.addArticle_post
  );

  /**
   * @swagger
   * /api/articles/{id}:
   *   delete:
   *     security:
   *       - bearerAuth: []
   *     summary: Delete specific article
   *     tags: [Blog]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: Delete specific article
   *     responses:
   *       200:
   *         description: Article has been successfully removed.
   *       404:
   *         description: Article not found.
   *       500:
   *         description: An error occurred deleting your article
   */
  app.delete(
    pathApi + "/articles/:id",
    passport.authenticate("jwt", { session: false }),
    articleControl.removeArticle_delete
  );

  /**
   * @swagger
   * /api/users/{id}/blogs:
   *   get:
   *     summary: Getting all articles per user
   *     security:
   *       - bearerAuth: []
   *     tags: [Blog]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: Getting all articles per user
   *     responses:
   *       200:
   *         description: List of articles.
   *       404:
   *         description: Articles or user not found
   *       500:
   *         description: An error occurred getting your article
   */
  app.get(
    pathApi + "/users/:id/blogs",
    passport.authenticate("jwt", { session: false }),
    articleControl.getAllArticlePerUser_get
  );

  /**
   * @swagger
   * /api/articles/{id}:
   *   patch:
   *     security:
   *       - bearerAuth: []
   *     summary: Update any article per user
   *     tags: [Blog]
   *     parameters:
   *       - in: path
   *         name: id
   *     requestBody:
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type : object
   *             $ref : '#/components/schemas/Article'
   *     responses:
   *       201:
   *         description: Your article has been successfully updated
   *       401 :
   *         description: Unauthorized
   *       404 :
   *         description: Article not found
   *       500 :
   *         description: An error occurred updating your article
   */
  app.patch(
    pathApi + "/articles/:id",
    passport.authenticate("jwt", { session: false }),
    uploadPicture.upload,
    articleControl.updateArticle_patch
  );
  /**
   * @swagger
   * /api/articles:
   *   get:
   *     summary: Get all articles
   *     tags: [Blog]
   *     responses:
   *       200:
   *         description: List of all articles
   *       404 :
   *         description: Articles not found
   *       500 :
   *         description: An error occurred list of articles
   */
  // app.get(pathApi + "/articles", articleControl.listOfAllArticles);

  /**
   * @swagger
   * /api/articles/categories/{id}:
   *   get:
   *     summary: Get all articles per category
   *     tags: [Blog]
   *     parameters:
   *       - in: path
   *         name: id
   *     responses:
   *       200:
   *         description: List articles in category
   *       404 :
   *         description: No article in category
   *       500 :
   *         description: An error occurred updating your article
   */
  app.get(
    pathApi + "/articles/categories/:id",
    articleControl.listArticlesPerCategory
  );

  app.get(pathApi + "/articles", articleControl.getArticlesByPage_get);
  app.get(pathApi + "/articles/:like", articleControl.listArticlesByLike_get);
  app.get(pathApi + "/articles/details/:id", articleControl.articleById_get);

  //Admin
  app.delete(
    pathApi + "/blogs/:id",
    passport.authenticate("jwt", { session: false }),
    checkRoleUser.checkIsAdmin,
    articleControl.deleteArticleById_delete
  );
  app.get(
    pathApi + "/list-articles",
    checkRoleUser.checkIsAdmin,
    articleControl.deleteArticleById_delete,
    articleControl.getArticlesByPage_get
  );
  app.patch(
    pathApi + "/blogs/:id",
    passport.authenticate("jwt", { session: false }),
    checkRoleUser.checkIsAdmin,
    articleControl.updateArticleByAdmin
  );

  app.get(
    pathApi + "/blogs/",

    articleControl.filtreArticles_post
  );
};

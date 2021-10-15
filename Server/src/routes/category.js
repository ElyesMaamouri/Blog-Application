module.exports = (app, pathApi) => {
  const categoryControl = require("../controllers/manageCategory/categoryControllers");
  const checkRoleUser = require("../middleware/chekRoleUser");
  const passport = require("passport");

  /**
   * @swagger
   * components:
   *   schemas:
   *     Category:
   *       type: object
   *       properties:
   *         category:
   *           type: string
   *           description: Title of category
   *       example:
   *         category: Html
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
   *  name : Category
   *  description : Category api
   */

  /**
   * @swagger
   * /api/categories:
   *   post:
   *     security:
   *       - bearerAuth: []
   *     summary: Create a new category
   *     tags: [Category]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type : object
   *             $ref : '#/components/schemas/Category'
   *     responses:
   *       201:
   *         description: Category has been successfully created
   *       401 :
   *         description: Unauthorized
   *       403 :
   *         description: Admin Token is not valid
   *       500 :
   *         description: An error occurred saving your article
   */
  app.post(
    pathApi + "/categories",
    passport.authenticate("jwt", { session: false }),
    checkRoleUser.checkIsAdmin,
    categoryControl.createCategory_post
  );

  /**
   * @swagger
   * /api/categories/{id}:
   *   put:
   *     security:
   *       - bearerAuth: []
   *     summary: Update any category
   *     tags: [Category]
   *     parameters:
   *       - in: path
   *         name: id
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type : object
   *             $ref : '#/components/schemas/Category'
   *     responses:
   *       200:
   *         description: Category already exists
   *       201:
   *         description: Category has been successfully updated
   *       401 :
   *         description: Unauthorized
   *       403 :
   *         description: Admin Token is not valid
   *       404 :
   *         description: Category not found
   *       500 :
   *         description: Error update category
   */
  app.put(
    pathApi + "/categories/:id",
    passport.authenticate("jwt", { session: false }),
    checkRoleUser.checkIsAdmin,
    categoryControl.updateCategory_put
  );

  /**
   * @swagger
   * /api/categories/:
   *   get:
   *     summary: Get all category
   *     tags: [Category]
   *     responses:
   *       200:
   *         description: List of categories
   *       404 :
   *         description: List of categories not found
   *       500 :
   *         description: Error get list categories
   */
  app.get(pathApi + "/categories", categoryControl.listCategories_get);

  /**
   * @swagger
   * /api/categories/{id}:
   *   get:
   *     summary: Get specific category
   *     tags: [Category]
   *     parameters:
   *       - in: path
   *         name: id
   *     responses:
   *       200:
   *         description: Get category per id
   *       404 :
   *         description: Category not found
   *       500 :
   *         description: Error get category
   */
  app.get(pathApi + "/categories/:id", categoryControl.listCategory_get);
  /**
   * @swagger
   * /api/categories/{id}:
   *   delete:
   *     security:
   *       - bearerAuth: []
   *     summary: Remove any category
   *     tags: [Category]
   *     parameters:
   *       - in: path
   *         name: id
   *     responses:
   *       200:
   *         description: Category has been successfully removed
   *       401 :
   *         description: Unauthorized
   *       403 :
   *         description: Admin Token is not valid
   *       404 :
   *         description: Category not found
   *       500 :
   *         description: Error remove category
   */
  app.delete(
    pathApi + "/categories/:id",
    passport.authenticate("jwt", { session: false }),
    checkRoleUser.checkIsAdmin,
    categoryControl.removeCategory
  );
};

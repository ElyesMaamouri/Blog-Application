module.exports = (app, pathApi) => {
  const clientControl = require("../controllers/manageUsers/clientControllers");
  const configUploadAvatar = require("../middleware/file-upload");
  const passport = require("passport");
  //Register client

  /**
   * @swagger
   * components:
   *   schemas:
   *     User:
   *       type: object
   *       required:
   *         - userName
   *         - email
   *         - password
   *         - fileUpload
   *       properties:
   *         userName:
   *           type: string
   *           description: Name of user
   *         email:
   *           type: string
   *           description: Email of user
   *         password:
   *           type: string
   *           description: Password of  user
   *         fileUpload :
   *           type : file
   *           description : Avatar of user
   *       example:
   *         userName: elyes
   *         email: email@email.co
   *         password: 12345678
   *         avatar : user.png
   */
  /**
   * @swagger
   * components:
   *   schemas:
   *     Update profile user:
   *       type: object
   *       required:
   *         - userName
   *         - email
   *         - currentlyPassword
   *         - newPassword
   *       properties:
   *         userName:
   *           type: string
   *           description: Name of user
   *         email:
   *           type: string
   *           description: Email of user
   *         password:
   *           type: string
   *           description: Current password user
   *       example:
   *         userName : user55
   *         email: email@email.co
   *         currentlyPassword : azertt123
   *         newPassword : newpassword123
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
   *  name : User
   *  description : Auth api
   */

  /**
   * @swagger
   * /api/signup:
   *   post:
   *     summary: Create a new user
   *     tags: [User]
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type : object
   *             $ref: '#/components/schemas/User'
   *     responses:
   *       201:
   *         description: The user was successfully created
   *       200 :
   *         description: Sorry ! email already exists
   *       500 :
   *         description: Error occurred register
   */

  app.post(
    pathApi + "/signup",
    configUploadAvatar.upload,
    clientControl.signup_post
  );

  /**
   * @swagger
   * /api/confirmation/{key}:
   *   get:
   *     summary: Confirmation Account client with email
   *     tags: [User]
   *     parameters:
   *       - in: path
   *         name: key
   *         schema:
   *           type: string
   *         required: true
   *         description: Confirmation Account client with email
   *     responses:
   *       200:
   *         description: Your account has been activated successfully. You can now login.
   *         contens:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       404:
   *         description: Error Key Activation
   */
  app.get(pathApi + "/confirmation/:key", clientControl.confirmAccount_get);

  /**
   * @swagger
   * /api/users/{id}:
   *  patch:
   *    security:
   *       - bearerAuth: []
   *    summary: Update profile user
   *    tags: [User]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: string
   *        required: true
   *        description: Update profile user
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/Update profile user'
   *    responses:
   *      201:
   *        description: Your account has been successfully updated
   *      401:
   *        description:  Unauthorized
   *      404:
   *        description: User not found
   *      500:
   *        description: Error update profile
   */
  app.patch(
    pathApi + "/users/:id",
    passport.authenticate("jwt", { session: false }),
    clientControl.profileUpdate_patch
  );
};

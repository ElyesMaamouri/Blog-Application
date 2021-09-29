module.exports = (app, pathApi) => {
  const clientControl = require("../controllers/manageUsers/clientControllers");
  const configUploadAvatar = require("../middleware/file-upload");
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
   *         password: azertyuiop
   *         avatar : user.png
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
   */

  app.post(
    pathApi + "/signup",
    configUploadAvatar.upload,
    clientControl.signup_post
  );
};

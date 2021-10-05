module.exports = (app, pathApi) => {
  const clientControl = require("../controllers/manageAuth/authController");
  const passport = require("passport");
  console.log(pathApi);
  //Login client
  // app.get(
  //   pathApi + "/google",
  //   passport.authenticate(
  //     "google",
  //     { scope: ["profile"] },
  //     clientControl.login_with_google_get
  //   )
  // );
  // app.get(
  //   pathApi + "/google/callback ",
  //   passport.authenticate("google", { failureRedirect: "/" })
  // );

  // app.get(pathApi + "/test", clientControl.test_route);

  /**
   * @swagger
   * components:
   *   schemas:
   *     Login User:
   *       type: object
   *       required:
   *         - email
   *         - password
   *       properties:
   *         email:
   *           type: string
   *           description: Email of user
   *         password:
   *           type: string
   *           description: Password of user
   *       example:
   *         email : email@email.co
   *         password : azertyuiop
   */
  /**
   * @swagger
   * components:
   *   schemas:
   *     Change Password:
   *       type: object
   *       required:
   *         - password
   *         - resetPasswordToken
   *       properties:
   *         password:
   *           type: string
   *           description: New password of user
   *         resetPasswordToken:
   *           type: string
   *           description: Token of user
   *       example:
   *         password : azerty123
   *         resetPasswordToken : eytifd
   */
  /**
   * @swagger
   * components:
   *   schemas:
   *     Reset Password:
   *       type: object
   *       required:
   *         - email
   *       properties:
   *         email:
   *           type: string
   *           description: Email of user
   *       example:
   *         email: email@email.co
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
   * /api/signin:
   *   post:
   *     summary: Login user
   *     tags: [User]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type : object
   *             $ref: '#/components/schemas/Login User'
   *     responses:
   *       200 :
   *         description: Successful authentication
   *       403 :
   *         description: Invalid email or password
   *       500 :
   *         description: Error occurred login
   */

  app.post(pathApi + "/signin", clientControl.login_post);

  /**
   * @swagger
   * /api/recoverpassword:
   *   post:
   *     summary: Recover Password User
   *     tags: [User]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             email : string
   *             $ref: '#/components/schemas/Reset Password'
   *     responses:
   *       404 :
   *         description: The email address is not associated with any account. Double-check your email address and try again.
   *       200 :
   *         description: Password reset instructions will be sent to this email
   *       500 :
   *         description: Error occurred reset password
   */
  app.post(pathApi + "/recoverpassword", clientControl.recoverPassword_post);

  /**
   * @swagger
   * /api/reset-password:
   *  put:
   *    security:
   *       - bearerAuth: []
   *    summary: Reset password account client
   *    tags: [User]
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/Change Password'
   *    responses:
   *      200:
   *        description: Token Expired ...
   *      204:
   *        description: Your password has been changed successfully
   *      404:
   *        description: User not found or Token expired ..
   *      500:
   *        description: Error occurred reset password
   */
  app.put(
    pathApi + "/reset-password",
    passport.authenticate("jwt", { session: false }),
    clientControl.resetPassword_put
  );
};

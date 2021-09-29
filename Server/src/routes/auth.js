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
   *     UserLogin:
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
   *         email: email@email.co
   *         password: azertyuiop
   */
  /**
   * @swagger
   * tags :
   *  name : User
   *  description : Auth api
   */

  /**
   * @swagger
   * /api/sigin:
   *   post:
   *     summary: Login user
   *     tags: [User]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type : object
   *             $ref: '#/components/schemas/UserLogin'
   *     responses:
   *       200 :
   *         description: Successful authentication
   *       404 :
   *         description: Invalid email or password
   *       500 :
   *         description: Error occurred login
   */

  app.post(pathApi + "/sigin", clientControl.login_post);
};

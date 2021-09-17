module.exports = (app, pathApi) => {
  const clientControl = require("../controllers/manageAuth/authController");
  const passport = require("passport");
  console.log(pathApi);
  //Login client
  app.get(
    pathApi + "/google",
    passport.authenticate(
      "google",
      { scope: ["profile"] },
      clientControl.login_with_google_get
    )
  );
  app.get(
    pathApi + "/google/callback ",
    passport.authenticate("google", { failureRedirect: "/" })
  );

  app.get(pathApi + "/test", clientControl.test_route);
};

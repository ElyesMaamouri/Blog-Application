module.exports = (app, pathApi) => {
  const commentControl = require("../controllers/manageComment/commentControllers");
  const checkRoleUser = require("../middleware/chekRoleUser");
  const passport = require("passport");

  app.post(
    pathApi + "/articles/:id/comments",
    passport.authenticate("jwt", { session: false }),
    commentControl.AddComment_post
  );

  app.get(pathApi + "/comments", commentControl.listComments);
};

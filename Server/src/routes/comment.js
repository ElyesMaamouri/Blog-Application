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
  app.delete(
    pathApi + "/comments/:id",
    passport.authenticate("jwt", { session: false }),
    checkRoleUser.checkIsAdmin,
    commentControl.removeComments_delete
  );
  app.get(pathApi + "/list-comments", commentControl.listCommentsPerPageAdmin);
};

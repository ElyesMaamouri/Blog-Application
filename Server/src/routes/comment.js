module.exports = (app, pathApi) => {
  const commentControl = require("../controllers/manageComment/commentControllers");
  const checkRoleUser = require("../middleware/chekRoleUser");
  const passport = require("passport");

  app.post(pathApi + "/articles/:id/comments", commentControl.AddComment_post);
};

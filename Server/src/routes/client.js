module.exports = (app, pathApi) => {
  const clientControl = require("../controllers/manageUsers/clientControllers");
  const configUploadAvatar = require("../middleware/file-upload");
  //Register client
  app.post(
    pathApi + "/signup",
    configUploadAvatar.upload,
    clientControl.signup_post
  );
};

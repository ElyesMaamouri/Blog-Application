const multer = require("multer");
const key = require("../utils/keys");
// Storage destination & rename file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Upload picture of article to floder user
    if (req.user) {
      cb(null, "src/uploads/" + req.user.path);
    } else {
      cb(null, "src/uploads/avatar");
    }
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("_").split(".")[0];
    const extension = key.MIME_TYPES[file.mimetype];
    cb(null, fileName + "-" + Date.now() + "." + extension);
  },
});
// upload file & test extension
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    //file filter
    if (
      ["jpeg", "jpg", "png", "gif", "PNG"].indexOf(
        file.originalname.split(".")[file.originalname.split(".").length - 1]
      ) === -1
    ) {
      req.fileValidationError =
        "Wrong extension type. You need an extension:'jpeg', 'jpg', 'png', 'gif', 'PNG' ";
      return callback(null, false, new Error(req.fileValidationError));
    }
    callback(null, true);
  },
}).single("fileUpload");

// return file name & display error extension or send default avatar
const getPicture = (file, fileValidationError, res, req) => {
  if (fileValidationError) {
    return res.status(400).send({
      success: false,
      message: fileValidationError,
    });
  }
  if (file) {
    return (picture = file.filename);
  } else {
    return (picture = key.defaultProfilPicture);
  }
};
module.exports = {
  storage: storage,
  upload: upload,
  getPicture: getPicture,
};

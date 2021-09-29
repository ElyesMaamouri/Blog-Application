const User = require("../../models/User");
const { userValidateForm } = require("../../middleware/validateSchema");
const logger = require("../../../config/logger");
const { cryptPassword } = require("../../utils/commonFunction");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const fileUpload = require("../../middleware/file-upload");
const _ = require("lodash");

exports.signup_post = async (req, res) => {
  const { error } = userValidateForm(req.body);
  if (error) {
    logger.error("Error Schema user", error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }

  const client = new User(
    _.pick(req.body, [
      "userName",
      "email",
      "password",
      "avatar",
      "keyActivation",
      "directoryPath",
    ])
  );

  try {
    const user = await User.findOne({ email: client.email });
    if (user) {
      return res.status(403).send({
        message: "Sorry! email already exists",
        success: false,
      });
    }

    //Get name of avatar
    client.avatar = fileUpload.getPicture(
      req.file,
      req.fileValidationError,
      res
    );

    //Crypt password
    client.password = await cryptPassword(client.password);
    // Generate key activation
    client.keyActivation = uuidv4();
    // Create floder with name user
    client.directoryPath = client.userName;

    fs.mkdir(
      path.join(__dirname, "../../uploads/" + client.userName),
      (err) => {
        if (err) {
          return logger.error("error floder user created");
        }
        console.log("Directory created successfully!");
      }
    );

    await client.save();
    return res.status(201).json({
      message: "Your account has been successfully created",
      success: true,
    });
  } catch (err) {
    logger.error("error occurred Register :", err);
    return res.status(500).send({
      message: "Error occurred register" + err,
      success: false,
    });
  }
};

const User = require("../../models/User");
const {
  userValidateForm,
  validateProfileUpdate,
  validateUpdateProfileAdmin,
} = require("../../middleware/validateSchema");
const logger = require("../../../config/logger");
const {
  cryptPassword,
  sendEmailToUser,
  compareHashPassword,
} = require("../../utils/commonFunction");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const fileUpload = require("../../middleware/file-upload");
const htmlTemplate = require("../../utils/template-verif-email");
const key = require("../../utils/keys");
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
      return res.status(200).send({
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
    // Send email activation
    sendEmailToUser(
      client.email,
      client.userName,
      client.keyActivation,
      key.messageActivation,
      htmlTemplate.templateVerifEmail
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
//Confirm account client
exports.confirmAccount_get = async (req, res) => {
  console.log("params link", req.params.key);
  try {
    const confirmAccount = await User.findOneAndUpdate(
      { keyActivation: req.params.key },
      { isActive: true },
      { new: true }
    );
    console.log(confirmAccount);
    if (!confirmAccount) {
      return res.status(404).send({
        message: "Error Key Activation",
        success: false,
      });
    }
    if (confirmAccount.isActive === true) {
      return res.status(200).send({
        message:
          "Your account has been activated successfully. You can now login.",
        success: true,
      });
    }
  } catch (err) {
    logger.error("error occurred activation account :" + err);
    return res.status(500).send({
      message: "error occurred activation account :" + err,
      success: false,
    });
  }
};

// update profil user
exports.profileUpdate_patch = async (req, res) => {
  const { error } = validateProfileUpdate(req.body);
  if (error) {
    return res.status(404).send(error.details[0].message);
  }
  const client = _.pick(req.body, [
    "userName",
    "email",
    "currentlyPassword",
    "newPassword",
  ]);

  client.newPassword = await cryptPassword(client.newPassword);

  const newUpdate = new User({
    _id: req.params.id,
    userName: client.userName,
    password: client.newPassword,
  });

  const customerEmail = req.user.email;
  console.log("client", customerEmail);
  //const emailUser = await User.findOne({ email: client.email });
  const findUser = await User.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: newUpdate }
  )
    .then(async (user) => {
      console.log(user.password);
      if (!user) {
        logger.error("User not found ID = " + req.params.id);
        return res.status(404).send({
          message: "User not found",
          success: false,
        });
      }
      if (user.email != customerEmail) {
        return res.status(200).send({
          message: "Invalid user",
          success: false,
        });
      }
      //Compare hash password
      const checkPassword = await compareHashPassword(
        client.currentlyPassword,
        user.password
      );
      // console.log("checkk", checkPassword);
      if (!checkPassword) {
        console.log(" if passs");
        logger.error("Invalid currently password : " + user.email);
        return res.status(200).send({
          message: "Invalid currently password",
          success: false,
        });
      }
      return res.status(201).send({
        message: "Your account has been successfully updated",
        success: true,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error update profile :" + err,
        success: false,
      });
    });
};

//Admin update profil client
exports.updateProfileClientAdmin_patch = async (req, res) => {
  try {
    console.log("object====>W", req.body);
    const { error } = validateUpdateProfileAdmin(req.body);
    if (error) {
      return res.status(404).send(error.details[0].message);
    }
    const client = _.pick(req.body, ["email", "newPassword"]);

    client.newPassword = await cryptPassword(client.newPassword);
    const newUpdate = new User({
      _id: req.params.id,
      email: client.email,
      password: client.newPassword,
      // isAdmin: client.isAdmin,
    });

    const email = await User.findOne({ email: client.email });

    if (email) {
      return res.status(200).send({
        message: "Sorry! email already exists",
        success: false,
      });
    }
    const user = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: newUpdate }
    );

    if (!user) {
      return res.status(404).send({
        message: "User not found",
        success: false,
      });
    }
    return res.status(201).send({
      message: "Account client has been successfully updated",
      success: false,
    });
  } catch (err) {
    logger.error("Error update profile client :" + err);
    return res.status(500).send({
      message: "Error update profile client:" + err,
      success: false,
    });
  }
};

// Admin  : Delete client
exports.deleteClientAdmin_delete = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete({ _id: req.params.id });
    console.log(user);
    if (!user) {
      return res.status(404).send({
        message: "User not found",
        success: false,
      });
    }
    const path = "src/uploads/avatar/" + user.avatar;
    await fs.unlinkSync(path);
    return res.status(200).send({
      message: "Account client has been successfully removed",
      success: true,
    });
  } catch (err) {
    logger.error("Error Removed client :" + err);
    return res.status(500).send({
      message: "Error Removed client" + err,
      success: false,
    });
  }
};

// Admin List of clients

exports.listClientsAdmin_get = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const pageSize = 5; // Limit
    const skip = (page - 1) * pageSize;
    const numberOfClients = await User.count();
    let totalPage = Math.ceil(numberOfClients / pageSize);

    const listClients = await User.find()
      .skip(skip)
      .limit(pageSize)
      .sort({ createAt: 1 });
    if (!listClients || listClients.length === 0) {
      return res.status(404).send({
        message: "Clients not found",
        success: false,
      });
    }
    return res.status(200).send({
      message: "List of client per page",
      success: true,
      totalPage: totalPage,
      page: page,
      size: pageSize,
      numberOfClients: numberOfClients,
      users: listClients,
    });
  } catch (err) {
    logger.error("Error List of client per page :", err);
    return res.status(500).send({
      message: "Error List of client per page" + err,
      success: false,
    });
  }
};

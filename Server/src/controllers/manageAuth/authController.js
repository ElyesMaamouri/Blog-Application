const User = require("../../models/User");
const {
  loginValidationForm,
  validateEmailResetPassword,
  validateResetPassword,
} = require("../../middleware/validateSchema");
const {
  compareHashPassword,
  generateTokens,
  cryptData,
  sendEmailToUser,
  decodeTokens,
  cryptPassword,
} = require("../../utils/commonFunction");
const key = require("../../utils/keys");
const htmlTemplate = require("../../utils/template-reset-password");
const logger = require("../../../config/logger");
const _ = require("lodash");

exports.login_post = async (req, res) => {
  const { error } = loginValidationForm(req.body);
  if (error) {
    return res.status(404).send(error.details[0].message);
  }

  const client = new User(_.pick(req.body, ["email", "password"]));

  try {
    console.log("user email ==>", client.email);
    let user = await User.findOne({ email: client.email });

    // Test if customer
    if (!user) {
      logger.error("Invalid email : " + client.email);
      return res.status(403).send({
        message: "Invalid email or password",
        success: false,
      });
    }

    //Compare hash password
    const checkPassword = await compareHashPassword(
      client.password,
      user.password
    );
    if (!checkPassword) {
      logger.error("Invalid password : " + user.email);
      return res.status(403).send({
        message: "Invalid email or password",
        success: false,
      });
    }

    if (user.isActive === false) {
      logger.error("Account not activated : " + user.email);
      return res.status(200).send({
        message: "please activate your account",
        success: false,
      });
    }
    const payload = {
      name: user.userName,
      id: cryptData(user.id),
      email: user.email,
      isAdmin: user.isAdmin,
      path: user.directoryPath,
    };

    const token = generateTokens(payload);
    return res.status(200).send({
      message: "Successful authentication",
      success: true,
      userToken: token,
    });
  } catch (err) {
    logger.error("Error occurred authentification user ", err);
    res.status(500).send({
      message: "Error occurred authentification user " + err,
      success: false,
    });
  }
};

// Send email with link reset password

exports.recoverPassword_post = async (req, res) => {
  const { error } = validateEmailResetPassword(req.body);
  if (error) {
    return res.status(404).send(error.details[0].message);
  }
  const client = new User(_.pick(req.body, "email"));

  const payload = { email: client.email };
  const token = generateTokens(payload);
  try {
    const user = await User.findOneAndUpdate(
      { email: client.email },
      { resetPasswordToken: token },
      { new: true }
    );
    console.log(user);
    if (!user) {
      return res.status(404).send({
        message:
          "The email address " +
          client.email +
          " is not associated with any account. Double-check your email address and try again.",
        success: false,
      });
    }

    sendEmailToUser(
      client.email,
      user.userName,
      token,
      key.messageResetPassword,
      htmlTemplate.templateResetPassword
    );
    return res.status(200).json({
      message: "Password reset instructions will be sent to this email",
      success: true,
    });
  } catch (err) {
    logger.error("Error occurred reset password : " + err);
    return res.status(500).send({
      message: "error occurred reset password" + err,
      success: false,
    });
  }
};

exports.resetPassword_put = async (req, res) => {
  const { error } = validateResetPassword(req.body);
  if (error) {
    return res.status(404).send(error.details[0].message);
  }
  const client = new User(_.pick(req.body, ["password"]));
  client.password = await cryptPassword(client.password);
  console.log(client.password);
  const tokenUser = decodeTokens(req.params.token);
  const date = new Date().getTime();
  const tokenLimitExpire = tokenUser.exp * 1000;

  if (tokenLimitExpire < date) {
    return res.status(200).send({
      message: "Token Expired ...",
      success: false,
    });
  }

  try {
    const user = await User.findOneAndUpdate(
      { resetPasswordToken: req.params.token },
      {
        password: client.password,
        resetPasswordToken: 0,
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).send({
        message: "User not found or Token expired ..",
        success: true,
      });
    }
    if (user) {
      return res.status(200).send({
        message: "Your password has been changed successfully",
        success: true,
      });
    }
  } catch (err) {
    logger.error("error occurred reset password :" + err);
    res.status(500).send({
      message: "error occurred reset password :" + err,
      success: false,
    });
  }
};
// exports.login_with_google_get = (req, res) => {
//   console.log("login with google", res);
// };

// exports.test_route = (req, res) => {
//   console.log("test ... test ...");
// };

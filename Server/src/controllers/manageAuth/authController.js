const User = require("../../models/User");
const { loginValidationForm } = require("../../middleware/validateSchema");
const {
  compareHashPassword,
  generateTokens,
  cryptData,
} = require("../../utils/commonFunction");
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

    // Test if customer find
    if (!user) {
      logger.error("Invalid email : " + client.email);
      return res.status(404).send({
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
      return res.status(404).send({
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
// exports.login_with_google_get = (req, res) => {
//   console.log("login with google", res);
// };

// exports.test_route = (req, res) => {
//   console.log("test ... test ...");
// };

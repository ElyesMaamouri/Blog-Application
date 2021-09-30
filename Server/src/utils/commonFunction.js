const bcrypt = require("bcryptjs");
const key = require("../utils/keys");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const nodemailer = require("nodemailer");
const jwtDecode = require("jwt-decode");
const logger = require("../../config/logger");
const dotenv = require("dotenv");
dotenv.config();

//Crypt password
exports.cryptPassword = async (password) => {
  const salt = bcrypt.genSaltSync(key.saltBcryptPassword);
  const cryptedPassword = await bcrypt.hashSync(password, salt);
  return cryptedPassword;
};

// Compare hash password
exports.compareHashPassword = (userPassword, passwordFromBody) => {
  const password = bcrypt.compareSync(userPassword, passwordFromBody);
  return password;
};

//Generate Token for user
exports.generateTokens = (payload) => {
  const token = jwt.sign(payload, key.secretToken, {
    expiresIn: key.tokenExprire,
  });
  return token;
};

exports.decodeTokens = (token) => {
  const tokenUser = jwtDecode(token);
  return tokenUser;
};

// Crypt data
exports.cryptData = (data) => {
  console.log("inputData", data);
  const inputData = CryptoJS.AES.encrypt(data, key.secretKey).toString();
  return inputData;
};

exports.sendEmailToUser = async (
  email,
  user,
  key,
  objectMessage,
  htmlTemplate
) => {
  console.log("config", process.env.EMAIL_GMAIL, process.env.PASSWORD_GMAIL);
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    service: "gmail",
    auth: {
      user: process.env.EMAIL_GMAIL,
      pass: process.env.PASSWORD_GMAIL,
    },
  });

  transporter
    .sendMail({
      from: process.env.EMAIL_GMAIL,
      to: email,
      subject: objectMessage,
      html: htmlTemplate(user, key, objectMessage),
    })
    .then((info) => {
      return info;
    })
    .catch((err) => {
      logger.error("Error sending email : " + err);
    });
};

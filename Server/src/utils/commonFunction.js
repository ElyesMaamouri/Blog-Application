const bcrypt = require("bcryptjs");
const key = require("../utils/keys");
const jwt = require("jsonwebtoken");
var CryptoJS = require("crypto-js");
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

// Crypt data
exports.cryptData = (data) => {
  console.log("inputData", data);
  const inputData = CryptoJS.AES.encrypt(data, key.secretKey).toString();
  return inputData;
};

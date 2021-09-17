const bcrypt = require("bcryptjs");

//Crypt password
exports.cryptPassword = async (password) => {
  let salt = bcrypt.genSaltSync(10);
  const cryptedPassword = await bcrypt.hashSync(password, salt);
  return cryptedPassword;
};

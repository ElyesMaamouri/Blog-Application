const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
// Validate user schema
exports.userValidateForm = (user) => {
  console.log("user uservalidate", user);
  const schema = Joi.object({
    userName: Joi.string().min(3).max(44),
    password: Joi.string().min(8).max(255),
    email: Joi.string().min(3).max(255).email(),
    avatar: Joi.string().min(3).max(255),
  });
  return schema.validate(user);
};

// Validation login schema
exports.loginValidationForm = (user) => {
  const schema = Joi.object({
    email: Joi.string().min(3).max(255).email(),
    password: Joi.string().min(8).max(255),
  });
  return schema.validate(user);
};

//Validation form reset password : input email
exports.validateEmailResetPassword = (email) => {
  const schema = Joi.object({
    email: Joi.string().min(3).max(255).email(),
  });
  return schema.validate(email);
};

//Validation new reset password : input password
exports.validateResetPassword = (password) => {
  const schema = Joi.object({
    password: Joi.string().min(8).max(255),
  });
  return schema.validate(password);
};

//Validation update profile user
exports.validateProfileUpdate = (data) => {
  const schema = Joi.object({
    userName: Joi.string().min(3).max(255),
    email: Joi.string().min(3).max(255).email(),
    password: Joi.string().min(8).max(255),
  });
  return schema.validate(data);
};

// Validation add article
exports.validateArticle = (article) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(255),
    content: Joi.string().min(3).max(255),
    picture: Joi.string().min(8).max(255),
    author: Joi.objectId(),
    category: Joi.objectId(),
  });
  return schema.validate(article);
};

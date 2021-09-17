const Joi = require("joi");

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

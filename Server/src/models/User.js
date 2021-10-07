const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 44,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    minlength: 3,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 255,
  },
  avatar: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  keyActivation: {
    type: String,
  },
  isActive: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  directoryPath: {
    type: String,
  },
  resetPasswordToken: {
    type: String,
  },
  blogs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Article",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);

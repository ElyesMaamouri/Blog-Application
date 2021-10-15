const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1000,
  },
  content: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 256,
  },
  picture: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "comment",
    },
  ],
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  vote: { type: Number, default: 0 },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Article", articleSchema);

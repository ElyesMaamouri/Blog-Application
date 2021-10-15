const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const categorySchema = new Schema({
  category: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 1000,
  },
  articles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Article",
    },
  ],
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Category", categorySchema);

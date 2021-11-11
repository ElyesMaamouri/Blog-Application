const Comment = require("../../models/Comment");
const Article = require("../../models/Article");
const { validateComment } = require("../../middleware/validateSchema");
const logger = require("../../../config/logger");
const _ = require("lodash");

// Post comment to specific article
exports.AddComment_post = async (req, res) => {
  console.log("comment", req.body);
  const { error } = validateComment(req.body);
  if (error) {
    logger.error("Error Schema comment", error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }
  try {
    const commentDetails = new Comment(_.pick(req.body, ["content", "author"]));

    const resultArticle = await Article.findByIdAndUpdate(req.params.id, {
      $push: { comments: commentDetails },
    });
    if (!resultArticle) {
      return res.status(404).send({
        message: "Article not found",
        success: false,
      });
    }
    if (resultArticle) {
      await commentDetails.save();
      return res.status(201).send({
        message: "Comment has been successfully created",
        success: false,
      });
    }
  } catch (err) {
    logger.error("Error occurred create comment -- " + err);
    return res.status(500).send({
      message: "Error occurred create comment -- " + err,
      success: false,
    });
  }
};

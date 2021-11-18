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
        success: true,
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

// Get comment
exports.listComments = async (req, res) => {
  try {
    Comment.find()
      .limit(5)
      .sort({ createAt: -1 })
      .populate({ path: "author", select: "userName" })
      .then((comments) => {
        if (!comments) {
          return res.status(404).send({
            message: "Comments not found",
            success: false,
          });
        }
        if (comments) {
          return res.status(200).send({
            message: "List of last five comments",
            success: true,
            comments: comments,
          });
        }
      });
  } catch (err) {
    logger.error("Error list of last five comments :", err);
    return res.status(500).send({
      message: "Error list of last five comments" + err,
      success: false,
    });
  }
};

//Admin delete comments
exports.removeComments_delete = async (req, res) => {
  const idComment = req.params.id;
  try {
    const comment = await Comment.findOneAndDelete({ _id: idComment });
    if (!comment) {
      return res.status(404).send({
        message: "Comment Not found",
        success: false,
      });
    }
    const item = await Article.findOneAndUpdate(
      { comments: { $in: idComment } },
      { $pull: { comments: idComment } }
    );

    return res.status(201).send({
      message: "Comment deleted",
      success: true,
    });
  } catch (err) {
    logger.error("Error delete comment" + err);
    return res.status(500).send({
      message: "Error delete comment" + err,
      success: false,
    });
  }
};

// Admin get comments per page
exports.listCommentsPerPageAdmin = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const pageSize = 5;
    const skip = (page - 1) * pageSize;
    const numberOfComments = await Comment.count();
    let totalPage = Math.ceil(numberOfComments / pageSize);
    const comments = await Comment.find()
      .skip(skip)
      .limit(pageSize)
      .sort({ createAt: -1 })
      .populate("author");

    if (!comments || comments.length === 0) {
      return res.status(404).send({
        message: "Comments not found",
        success: false,
      });
    }
    return res.status(200).send({
      message: "List of comments per page",
      success: true,
      totalPage: totalPage,
      page: page,
      size: pageSize,
      comments: comments,
    });
  } catch (err) {
    logger.error("Error of list comments" + err);
    return res.status(500).send({
      message: "Error of list comments" + err,
      success: false,
    });
  }
};

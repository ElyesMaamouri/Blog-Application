const Article = require("../../models/Article");
const User = require("../../models/User");
const logger = require("../../../config/logger");
const { validateArticle } = require("../../middleware/validateSchema");
const fileUpload = require("../../middleware/file-upload");
const { decryptData } = require("../../utils/commonFunction");
const fs = require("fs");
const _ = require("lodash");

exports.addArticle_post = async (req, res) => {
  const { error } = validateArticle(req.body);
  if (error) {
    return res.status(404).send(error.details[0].message);
  }
  try {
    const article = new Article(
      _.pick(req.body, ["title", "content", "author", "picture", "category"])
    );
    //Get name of picture article
    article.picture = fileUpload.getPicture(
      req.file,
      req.fileValidationError,
      res
    );

    article.author = await decryptData(req.user.id);
    await article.save().then((data) => {
      User.findByIdAndUpdate(
        { _id: article.author },
        { $push: { blogs: data.id } }
      ).then(() => {
        return res.status(201).json({
          message: "Your article has been successfully created",
          success: true,
        });
      });
    });
  } catch (err) {
    logger.error("Error occurred add article :", err);
    return res.status(500).send({
      message: "Error occurred add article :" + err,
      success: false,
    });
  }
};

exports.removeArticle_delete = async (req, res) => {
  try {
    const client = decryptData(req.user.id);
    const userBlogs = await User.findById({ _id: client });

    // Get list of ids blogs[]
    const idArticle = userBlogs.blogs.map((item) => {
      return item._id.toString();
    });

    // Remove article if id blog exist in array blogs[]
    if (idArticle.includes(req.params.id) === true) {
      const removeArticle = await Article.findOneAndDelete({
        _id: req.params.id,
      });
      await User.findOneAndUpdate(
        { _id: client },
        { $pull: { blogs: req.params.id } }
      );
      const path = "src/uploads/" + req.user.path + "/" + removeArticle.picture;
      await fs.unlinkSync(path);
      return res.status(200).send({
        message: "Article has been successfully removed",
        success: true,
      });
    } else {
      logger.error("Article not found Id = ", req.params.id);
      res.status(404).send({
        message: "Article not found",
        success: false,
      });
    }
  } catch (err) {
    logger.error("An error occurred deleting your article : ", err);
    return res.status(500).send({
      message: "	An error occurred deleting your article :" + err,
      success: false,
    });
  }
};

exports.getAllArticlePerUser_get = async (req, res) => {
  try {
    const authorBlogs = await User.findOne({ _id: req.params.id })
      .select("blogs")
      .populate(["blogs"]);
    if (!authorBlogs) {
      logger.error("Article or user not found Id = ", req.params.id);
      return res.status(404).send({
        message: "Article or user not found",
        success: false,
      });
    }
    return res.status(200).send({
      message: "List of article ",
      success: true,
      articles: authorBlogs,
    });
  } catch (err) {
    logger.error("An error occurred getting your article : ", err);
    return res.status(500).send({
      message: "An error occurred getting your article : " + err,
      success: false,
    });
  }
};

exports.updateArticle_patch = async (req, res) => {
  const { error } = validateArticle(req.body);
  if (error) {
    return res.status(404).send(error.details[0].message);
  }
  try {
    const article = new Article(
      _.pick(req.body, ["title", "content", "author", "picture", "category"])
    );

    const client = decryptData(req.user.id);
    const userBlogs = await User.findById({ _id: client });
    // Get list of ids blogs[]
    const idArticle = userBlogs.blogs.map((item) => {
      return item._id.toString();
    });

    if (idArticle.includes(req.params.id)) {
      if (req.file) {
        article.picture = fileUpload.getPicture(
          req.file,
          req.fileValidationError,
          res
        );
      } else {
        const data = await Article.findById({ _id: req.params.id });
        article.picture = data.picture;
      }

      const newUpdate = new Article({
        _id: req.params.id,
        title: article.title,
        content: article.content,
        picture: article.picture,
        category: article.category,
      });

      await Article.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: newUpdate }
      );
      return res.status(201).send({
        message: "Your article has been successfully updated",
        success: true,
      });
    } else {
      logger.error("Article not found (Update article)");
      return res.status(404).send({
        message: "Article not found",
        success: false,
      });
    }
  } catch (err) {
    logger.error("An error occurred updating your article :", err);
    return res.status(500).send({
      message: "An error occurred updating your article :" + err,
      success: false,
    });
  }
};

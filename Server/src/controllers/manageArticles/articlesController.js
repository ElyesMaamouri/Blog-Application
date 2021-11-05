const Article = require("../../models/Article");
const User = require("../../models/User");
const categorySchema = require("../../models/Category");
const logger = require("../../../config/logger");
const { validateArticle } = require("../../middleware/validateSchema");
const fileUpload = require("../../middleware/file-upload");
const { decryptData } = require("../../utils/commonFunction");
const fs = require("fs");
const _ = require("lodash");

// Add new article
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
    article.author = req.user.id;
    await article.save().then((data) => {
      User.findByIdAndUpdate(
        { _id: article.author },
        { $push: { blogs: data.id } }
      ).then(async () => {
        await categorySchema
          .findByIdAndUpdate(
            { _id: article.category },
            { $push: { articles: data.id } }
          )
          .then(() => {
            return res.status(201).json({
              message: "Your article has been successfully created",
              success: true,
            });
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

// Delete article with picture & delete id from array blogs
exports.removeArticle_delete = async (req, res) => {
  try {
    const client = req.user.id;
    console.log("client", req.user.id);
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

// Get all articles user
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

// Update article
exports.updateArticle_patch = async (req, res) => {
  const { error } = validateArticle(req.body);
  if (error) {
    return res.status(404).send(error.details[0].message);
  }
  try {
    const article = new Article(
      _.pick(req.body, ["title", "content", "author", "picture", "category"])
    );

    const client = req.user.id;

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

// Get all article

exports.listOfAllArticles = async (req, res) => {
  try {
    const listArticles = await Article.find();
    if (!listArticles) {
      return res.status(404).send({
        message: "Articles not found",
        success: false,
      });
    }
    if (listArticles) {
      return res.status(200).send({
        message: "List of all articles",
        articles: listArticles,
      });
    }
  } catch (err) {
    logger.error("An error occurred list of articles :", err);
    return res.status(500).send({
      message: "An error occurred list of articles :" + err,
      success: false,
    });
  }
};

//Get article per category

exports.listArticlesPerCategory = async (req, res) => {
  try {
    const items = await categorySchema
      .findById({ _id: req.params.id })
      .select("articles")
      .populate(["articles"]);
    if (!items) {
      return res.status(404).send({
        message: "No article in category",
        success: false,
      });
    }
    console.log(items);
    if (items.articles.length === 0) {
      return res.status(200).send({
        message: "No article in category ",
        success: false,
      });
    }
    return res.status(200).send({
      message: "List articles in category",
      success: true,
      articles: items,
    });
  } catch (err) {
    logger.error("An error occurred list of articles per category :", err);
    return res.status(500).send({
      message: "An error occurred list of articles per category:" + err,
      success: false,
    });
  }
};

// Pagination

exports.getArticlesByPage_get = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const pageSize = 5; // Limit
    const skip = (page - 1) * pageSize;
    const numberOfArticles = await Article.count();
    let totalPage = Math.ceil(numberOfArticles / pageSize);

    const blogs = await Article.find()
      .skip(skip)
      .limit(pageSize)
      .populate("author");
    if (!blogs || blogs.length === 0) {
      return res.status(404).send({
        message: "Articles not found",
        success: false,
      });
    }
    return res.status(200).send({
      message: "List of articles per page",
      success: true,
      totalPage: totalPage,
      page: page,
      size: pageSize,
      articles: blogs,
    });
  } catch (err) {
    logger.error("Error list of articles :", err);
    return res.status(500).send({
      message: "Error list of articles" + err,
      success: false,
    });
  }
};

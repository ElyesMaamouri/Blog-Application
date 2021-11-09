const categorySchema = require("../../models/Category");
const Article = require("../../models/Article");
const { validateCategory } = require("../../middleware/validateSchema");
const logger = require("../../../config/logger");
const _ = require("lodash");

// Create new category
exports.createCategory_post = async (req, res) => {
  const { error } = validateCategory(req.body);
  if (error) {
    logger.error("Error Schema category", error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }
  const slug = new categorySchema(_.pick(req.body, ["category"]));
  try {
    const checkCategory = await categorySchema.findOne({
      category: slug.category,
    });
    if (checkCategory) {
      return res.status(200).send({
        message: "Category already exists ",
        success: false,
      });
    }
    await slug.save();
    return res.status(201).send({
      message: " Category has been successfully created",
      success: true,
    });
  } catch (err) {
    logger.error("Error occurred create category :", err);
    return res.status(500).send({
      message: "Error occurred create category" + err,
      success: false,
    });
  }
};

// Update existe category
exports.updateCategory_put = async (req, res) => {
  const { error } = validateCategory(req.body);
  if (error) {
    logger.error("Error Schema category", error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }
  const slug = new categorySchema(_.pick(req.body, ["category"]));
  const newUpdate = new categorySchema({
    _id: req.params.id,
    category: slug.category,
  });
  //   const checkCategory = await categorySchema.findOne({
  //     category: slug.category,
  //   });

  await categorySchema
    .findByIdAndUpdate({ _id: req.params.id }, { $set: newUpdate })
    .then((item) => {
      if (!item) {
        logger.error("Category not found ", req.user.id);
        return res.status(404).send({
          message: "Category not found",
          success: false,
        });
      }
      if (item.category === slug.category) {
        return res.status(200).send({
          message: "Category already exists",
          success: true,
        });
      }
      return res.status(201).send({
        message: "Category has been successfully updated",
        success: true,
      });
    })
    .catch((err) => {
      logger.error("Error update category " + err);
      return res.status(500).send({
        message: "Error update category :" + err,
        success: false,
      });
    });
};

// Get all categories
exports.listCategories_get = async (req, res) => {
  try {
    const listOfCategories = await categorySchema.find();
    if (!listOfCategories) {
      return res.status(404).send({
        message: "List of categories not found",
        success: true,
      });
    }
    return res.status(200).send({
      message: "List of categories",
      success: true,
      categories: listOfCategories,
    });
  } catch (err) {
    logger.error("Error get list categories " + err);
    return res.status(500).send({
      message: "Error get list categories :" + err,
      success: false,
    });
  }
};

//Get category by id
exports.listCategory_get = async (req, res) => {
  try {
    const category = await categorySchema
      .findById({ _id: req.params.id })
      .populate({
        path: "articles",
        populate: { path: "author" },
      });

    if (!category) {
      return res.status(404).send({
        message: "Category not found",
        success: false,
      });
    }
    return res.status(200).send({
      message: "Category name",
      success: true,
      category: category,
    });
  } catch (err) {
    logger.error("Error get category " + err);
    return res.status(500).send({
      message: "Error get category :" + err,
      success: false,
    });
  }
};

// delete a category with these articles
exports.removeCategory = async (req, res) => {
  try {
    // Find and delete category with artilce
    const item = await categorySchema.findByIdAndDelete({ _id: req.params.id });
    if (!item) {
      return res.status(404).send({
        message: "Category not found",
        success: true,
      });
    }
    if (item) {
      const blogs = item.articles.map((data) => {
        return data._id.toString();
      });
      // Find articles to delete them
      await Article.deleteMany({ _id: { $in: blogs } });
      return res.status(200).send({
        message: "Category has been successfully removed",
        success: true,
      });
    }
  } catch (err) {
    logger.error("Error remove category " + err);
    return res.status(500).send({
      message: "Error remove category :" + err,
      success: false,
    });
  }
};

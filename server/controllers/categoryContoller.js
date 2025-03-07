import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(401).send({ message: "name is requied" });
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory)
      return res
        .status(401)
        .send({ message: "category already exist", success: true });
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      message: "category created successfully",
      success: true,
      category,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "error in category", error, success: false });
  }
};

// update category router
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      message: "category updated successfully",
      success: true,
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error,
      message: "error while updating in category",
      success: false,
    });
  }
};

//get all Category
export const categoryController = async (req, res) => {
  try {
    const Category = await categoryModel.find({});
    res.status(200).send({ message: "category list", success: true, Category });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error,
      message: "error while fetching all category",
      success: false,
    });
  }
};

//  single category constroller
export const singleCategoryController = async (req, res) => {
  try {
    // const { slug } = req.params;
    const category = await categoryModel.findOne({ slug: req.params.slug });
    res
      .status(200)
      .send({ message: "single category found", success: true, category });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error,
      message: "error while fetching single category",
      success: false,
    });
  }
};

//  delete ccategory controller
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.findByIdAndDelete(id);
    res.status(200).send({ message: "category deleted", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error,
      message: "error while deleting category",
      success: false,
    });
  }
};

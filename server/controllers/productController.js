import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";

// create product
export const createProductController = async (req, res) => {
  try {
    const { name, price, description, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res
          .status(400)
          .json({ message: "name is required ", error: error.message });
      case !price:
        return res.status(400).json({ message: "price is required" });
      case !description:
        return res.status(400).json({ message: "description is required" });
      case !category:
        return res.status(400).json({ message: "category is required" });
      case !quantity:
        return res.status(400).json({ message: "quantity is required" });
      case !photo || photo.size > 1000000:
        return res
          .status(400)
          .json({ message: "photo is required and less than 1 mb " });
    }
    const products = new productModel({
      ...req.fields,
      slug: slugify(name),
    });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      message: "product created successfully",
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error fetching products" });
  }
};

//  all products
export const getAllProductsController = async (req, res) => {
  try {
    const products = await productModel
      .find()
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      message: "products fetched successfully",
      products,
      countTotal: products.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error fetching products" });
  }
};

export const singleproduct = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await productModel
      .findOne({ slug })
      .select("-photo")
      .populate("category");
    if (!product) return res.status(404).json({ message: "product not found" });
    res.status(200).send({ message: "product fetched successfully", product });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error fetching products" });
  }
};

//  product photo
export const productPhotoController = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productModel.findById(pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error fetching products" });
  }
};

// delete product
export const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productModel.findByIdAndDelete(pid).select("-photo");
    res.status(200).send({
      message: "product deleted successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error deleting product" });
  }
};

// update the product
export const updateProductController = async (req, res) => {
  try {
    const { name, price, description, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res
          .status(400)
          .json({ message: "name is required ", error: error.message });
      case !price:
        return res.status(400).json({ message: "price is required" });
      case !description:
        return res.status(400).json({ message: "description is required" });
      case !category:
        return res.status(400).json({ message: "category is required" });
      case !quantity:
        return res.status(400).json({ message: "quantity is required" });
      case !photo || photo.size > 1000000:
        return res
          .status(400)
          .json({ message: "photo is required and less than 1 mb " });
    }
    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      message: "product update  successfully",
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error fetching products" });
  }
};

// filter product

export const productFilterCOntroller = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel
      .find(args)
      .populate("category")
      .sort({ createdAt: -1 });
    res
      .status(200)
      .send({
        products,
        success: true,
        message: "products fetched successfully",
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error while filtering the  products" });
  }
};

// product count

export const countProductController = async (req, res) => {
  try {
    
    const total = await productModel.estimatedDocumentCount();
    console.log(total)
    res.status(200).send({ total, success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({
        message: "Error fetching while pagination the  products",
        success: false,
        error,
      });
  }
};

//  product list based on page
export const ProductListController = async (req, res) => {
  try {
    const perpage = 6;
    const page = req.params.page ? req.params.page : 1;
    const skip = (page - 1) * perpage;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip(skip)
      .limit(perpage)
      .sort({ createdAt: -1 });
      res.status(200).send({ products, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error in per page ", success: false });
  }
};

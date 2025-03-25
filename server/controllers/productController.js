import slugify from "slugify";
import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import fs from "fs";
import braintree from "braintree";
import OrderModel from "../models/OrderModel.js";
import dotenv from "dotenv";
import { response } from "express";
dotenv.config();

// paymnet gateway
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox, // Use "Production" in live mode
  merchantId: process.env.MERCHANT_ID,
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
});

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
    res.status(200).send({
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
    // console.log(total)
    res.status(200).send({ total, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error fetching while pagination the  products",
      success: false,
      error,
    });
  }
};

//  product list based on page
export const ProductListController = async (req, res) => {
  try {
    const perpage = 3;
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

//  search product
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const products = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.status(200).json({ products, success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error in searching the product  ", success: false });
  }
};
//  similar product
export const relatedProductController = async (req, res) => {
  const { pid, cid } = req.params;
  try {
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid }, // ne - not include
      })
      .limit(3)
      .select("-photo")
      .populate("category");
    res.status(200).send({ success: true, products });
  } catch (error) {
    res.status(500).json({ error: "Error fetching similar products" });
  }
};

// Get product by category
export const productCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await categoryModel.findOne({ slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({ success: true, products, category });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "getting error while fectching the product by category",
      error: "Error fetching products by category",
    });
  }
};

// braintreeTokenController
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken
      .generate({})
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => res.status(500).send(err));
  } catch (error) {
    res.status(500).json({ error: "Error generating braintree token" });
  }
};
export const braintreePaymentController = async (req, res) => {
  const nonceFromTheClient  = req.body.payment_method_nonce;
    gateway.transaction.sale(
        {
          amount: "10.00",
          paymentMethodNonce: nonceFromTheClient,
          options: {
            submitForSettlement: true,
          },
        },).then(
          (response) => {res.status(200).send(response)}
        ).catch(err=>res.status(500).send(err))

}
//   try {
    



//     // const { cart, nonce } = req.body;
//     // let total = 0;
//     // cart.map((i) => {
//     //   total += i.price;
//     // });
//     // let newTransaction = gateway.transaction.sale(
//     //   {
//     //     amount: total,
//     //     paymentMethodNonce: nonce,
//     //     options: {
//     //       submitForSettlement: true,
//     //     },
//     //   },
//     //   async function (err, result) {
//     //     if (result) {
//     //       const order = await new OrderModel({
//     //         products: cart,
//     //         payment: result,
//     //         buyer: req.user._id,
//     //       }).save();
//     //       res.status(200).json({ ok: true, order });
//     //     } else {
//     //       res.status(500).json({ ok: false, error: err });
//     //     }
//     //   }
//     // );
//   } catch (error) {
//     res.status(500).json({ error: "Error processing braintree payment" });
//   }
// };

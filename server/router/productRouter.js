import express from "express";
import { isadmin, requireSignIn } from "../middlewares/authmiddlewares.js";
import {
  countProductController,
  createProductController,
  deleteProduct,
  getAllProductsController,
  productCategoryController,
  productFilterCOntroller,
  ProductListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  singleproduct,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";
const router = express.Router();

router.post(
  "/create-product",
  requireSignIn,
  isadmin,
  formidable(),
  createProductController
);
router.put(
  "/update-product/:pid",
  requireSignIn,
  isadmin,
  formidable(),
  updateProductController
);
// get-all product
router.get("/get-all-product", getAllProductsController);
//  get single produt by name
router.get("/single-product/:slug", singleproduct);
// get product PHOTO
router.get("/product-photo/:pid", productPhotoController);
//  delete the product
router.get("/delete-product/:pid", deleteProduct);
// filter peroduct
router.post("/filter-product", productFilterCOntroller);
// product count
router.get("/count-product", countProductController);
// product per page
router.get("/product-list/:page", ProductListController);
// search controller
router.get("/search/:keyword", searchProductController);
// similar product 
router.get("/related-product/:pid/:cid", relatedProductController);
//  category wise product
router.get("/product-category/:slug", productCategoryController);

export default router;

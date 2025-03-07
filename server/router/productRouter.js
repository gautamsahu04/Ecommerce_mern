import express from "express"
import { isadmin, requireSignIn } from "../middlewares/authmiddlewares.js"
import { countProductController, createProductController, deleteProduct, getAllProductsController, productFilterCOntroller, ProductListController, productPhotoController, singleproduct, updateProductController } from "../controllers/productController.js"
import formidable from "express-formidable"
const router = express.Router()

router.post("/create-product", requireSignIn,isadmin,formidable(), createProductController)
router.put("/update-product/:pid", requireSignIn,isadmin,formidable(), updateProductController)
router.get("/get-all-product",getAllProductsController)
router.get("/single-product/:slug",singleproduct)
router.get("/product-photo/:pid",productPhotoController)
router.get("/delete-product/:pid",deleteProduct)

// filter peroduct 
router.post("/filter-product",productFilterCOntroller)

// product count
router.get("/count-product",countProductController)
// product per page
router.get("/product-list/:page",ProductListController)








export default router















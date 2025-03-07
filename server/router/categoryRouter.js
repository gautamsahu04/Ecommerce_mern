import express from "express"
import { isadmin, requireSignIn } from "../middlewares/authmiddlewares.js"
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from "../controllers/categoryContoller.js"

const router = express.Router()

router.post("/create-category",requireSignIn,isadmin, createCategoryController)

// update category router
router.put("/update-category/:id",requireSignIn,isadmin, updateCategoryController)
router.get("/get-category", categoryController)
router.get("/single-category/:slug", singleCategoryController)
router.delete("/delete-category/:id",requireSignIn,isadmin, deleteCategoryController)

export default router
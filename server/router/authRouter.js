import express from "express";
import  {registerController, loginController, tokencheck } from "../controllers/authController.js"
import { isadmin, requireSignIn } from "../middlewares/authMiddlewares.js";
const router = express.Router()

router.get("/test", (req,res)=>{
    res.send("Hello from test route")
})


router.post("/register",registerController)
router.post("/login" , loginController)
// router.get("/token",requireSignIn , isadmin, tokencheck)
router.get("/user-auth" ,requireSignIn, (req,res)=>{
    res.status(200).send({
        ok:true,
        message : "Hello from dashboard"
    })
})

router.get("/admin-auth" ,requireSignIn ,isadmin, (req,res)=>{
    res.status(200).send({
        ok:true,
        message : "Hello from dashboard"
    })
})

export default router;   




















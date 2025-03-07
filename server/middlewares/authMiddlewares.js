import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const requireSignIn = (req, res, next) => {
  try {
    const decoded = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    // console.log(req.headers.authorization);
    req.user = decoded
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

// admin access
export const isadmin = async(req,res,next)=>{
    try {
        const user = await userModel.findById(req.user._id)
        if(user.role !==1 ) {
            return res.status(403).json({ 
                success:false,
                message: "Access denied" });        

        }
        else {
            // console.log("isadmin middlewares is working") 
            next()
        }
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });

        
    }
}

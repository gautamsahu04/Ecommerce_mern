import express from "express"
import   dotenv from "dotenv";
import cors from "cors"
import database from "./dB_Connection/db_connection.js";
import morgan from "morgan";
import authRouter from "./router/authRouter.js";
import categoryRouter from "./router/categoryRouter.js"
import productRouter from "./router/productRouter.js"
import path from "path"
const app = express()

dotenv.config();
app.use(cors())
app.use(express.json())

// app.use(express.urlencoded({ extended: true }))



// routes
app.use("/api/auth", authRouter)
app.use("/api/category",categoryRouter )
app.use("/api/product",productRouter) 

// ................code for production...production...........
if (process.env.DEV_MODE === "production") {
  const dirPath = path.resolve();
  app.use(express.static("./client/dist"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(dirPath, "./client/dist", "index.html"));
  });
}


const port = process.env.PORT || 8080

// database connection 
database();
app.listen(port, () => {
  console.log(` app listening in  ${process.env.DEV_MODE} mode  on port ${port}`)
})
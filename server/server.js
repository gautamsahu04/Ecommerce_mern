import express from "express"
import   dotenv from "dotenv";
import cors from "cors"
import database from "./dB_Connection/db_connection.js";
import morgan from "morgan";
import authRouter from "./router/authRouter.js";
import categoryRouter from "./router/categoryRouter.js"
import productRouter from "./router/productRouter.js"
const app = express()

dotenv.config();
app.use(cors())
app.use(express.json())
// app.use(express.urlencoded({ extended: true }))


// routes
app.use("/api/auth", authRouter)
app.use("/api/category",categoryRouter )
app.use("/api/product",productRouter) 




const port = process.env.PORT

// database connection 
database();
app.listen(port, () => {
  console.log(` app listening in  ${process.env.DEV_MODE} mode  on port ${port}`)
})
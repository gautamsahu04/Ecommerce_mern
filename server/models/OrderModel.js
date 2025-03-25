import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type:mongoose.ObjectId,
        ref: "Product"
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "User", // Reference to User Model
      
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default  mongoose.model("Order", orderSchema);

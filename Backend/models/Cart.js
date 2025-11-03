import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one active cart per user
    },
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan", // references the Plan model
      required: true,
    },
    quantity: {
      type: Number,
      default: 1, 
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
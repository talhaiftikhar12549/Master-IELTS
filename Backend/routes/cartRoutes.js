import express from "express";
import { addToCart, getCart, clearCart } from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// One plan per user in cart
router.route("/")
  .get(protect, getCart)
  .post(protect, addToCart)
  .delete(protect, clearCart);

export default router;
import express from "express";
import { createOrder, getOrders, getOrderById } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create new order from cart
router.post("/", protect, createOrder);

// Get user orders
router.get("/", protect, getOrders);

// Get single order
router.get("/:id", protect, getOrderById);

export default router;
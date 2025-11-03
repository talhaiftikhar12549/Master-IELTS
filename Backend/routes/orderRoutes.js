import express from "express";
import { createOrder, getOrders, getOrderById } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create new order from cart
router.post("/", createOrder);

// Get user orders
router.get("/", getOrders);

// Get single order
router.get("/:id", getOrderById);

export default router;
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Plan from "../models/Plan.js";

// Create order from cart
export const createOrder = async (req, res) => {
  try {
    const { planId, quantity, guestEmail } = req.body;

    // Ensure plan still exists
    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: "Selected plan not found" });
    }

    const totalAmount = (plan.discPrice || plan.actualPrice) * quantity;

    const order = new Order({
      user: req.user ? req.user.id : null, // logged in or guest
      guestEmail: req.user ? null : guestEmail,
      plan: plan._id,
      totalAmount,
      status: "pending",
    });

    await order.save();

    // Clear user cart if logged in
    if (req.user) {
      await Cart.findOneAndDelete({ user: req.user.id });
    }

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: "Error creating order", error: err.message });
  }
};

// Get all orders for user
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate("plan");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders", error: err.message });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user.id }).populate("plan");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Error fetching order", error: err.message });
  }
};
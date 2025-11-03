import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Plan from "../models/Plan.js";

// Create order from cart
export const createOrder = async (req, res) => {
  try {
    const { planId, quantity } = req.body;
    const userId = req.user ? req.user.id : null;

    // Ensure plan exists
    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: "Selected plan not found" });
    }

    const totalAmount = (plan.discPrice || plan.actualPrice) * quantity;

    const order = new Order({
      user: userId, // guests: null
      plan: plan._id,
      totalAmount,
      status: "pending",
    });

    await order.save();

    // Clear user cart if logged in
    if (userId) {
      await Cart.findOneAndDelete({ user: userId });
    }

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: "Error creating order", error: err.message });
  }
};

// Get all orders for user
export const getOrders = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Login required to view your orders" });
    }

    const orders = await Order.find({ user: req.user.id }).populate("plan");
    res.json(orders);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching orders", error: err.message });
  }
};

// Get order by ID (works for both user and guest)
export const getOrderById = async (req, res) => {
  try {
    let order;

    if (req.user) {
      // Logged-in user: make sure order belongs to them
      order = await Order.findOne({
        _id: req.params.id,
        user: req.user.id,
      }).populate("plan");
    } else {
      // Guest: just fetch by orderId (stored in localStorage on frontend)
      order = await Order.findById(req.params.id).populate("plan");
    }

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching order", error: err.message });
  }
};
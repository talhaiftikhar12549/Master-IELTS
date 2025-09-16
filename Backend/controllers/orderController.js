import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Plan from "../models/Plan.js";

// Create order from cart
export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find cart for user
    const cart = await Cart.findOne({ user: userId }).populate("plan");
    if (!cart) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Ensure plan still exists
    const plan = await Plan.findById(cart.plan._id);
    if (!plan) {
      return res.status(404).json({ message: "Selected plan not found" });
    }

    // Calculate total amount
    const totalAmount = (plan.discPrice || plan.actualPrice) * cart.quantity;

    // Create new order
    const order = new Order({
      user: userId,
      plan: plan._id,
      totalAmount,
      status: "pending",
    });

    await order.save();

    // Clear cart after order creation
    await Cart.findOneAndDelete({ user: userId });

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
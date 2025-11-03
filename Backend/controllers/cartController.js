import Cart from "../models/Cart.js";
import Plan from "../models/Plan.js";

// Add plan to cart (1 plan per user)
export const addToCart = async (req, res) => {
  try {
    const { planId, quantity = 1 } = req.body;
    const userId = req.user.id;

    // Validate plan
    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    // Calculate price (use discount if available)
    const price = plan.discPrice || plan.actualPrice;
    const totalPrice = price * quantity;

    // Check if user already has a cart
    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      // Update cart with new plan
      cart.plan = planId;
      cart.quantity = quantity;
      cart.totalPrice = totalPrice;
    } else {
      // Create new cart
      cart = new Cart({
        user: userId,
        plan: planId,
        quantity,
        totalPrice,
      });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding to cart", error: err.message });
  }
};

// Get current user’s cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("plan");
    if (!cart || cart.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Cart is empty",
        cart: [],
      });
    }
    res.json(cart);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching cart", error: err.message });
  }
};

// Clear cart
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndDelete({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: "No cart found" });
    }
    res.json({ message: "Cart cleared successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error clearing cart", error: err.message });
  }
};

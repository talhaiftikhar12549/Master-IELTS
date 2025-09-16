import Stripe from "stripe";
import Order from "../models/Order.js";
import Payment from "../models/Payment.js";

// Create Payment Intent
export const createPaymentIntent = async (req, res) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2023-10-16",
    });

    const { orderId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.totalAmount * 100), // in cents
      currency: "usd",
      metadata: {
        orderId: order._id.toString(),
        userId: order.user.toString(),
      },
    });

    // store intent ID in order
    order.paymentIntentId = paymentIntent.id;
    await order.save();

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Confirm payment (via webhook usually, but also endpoint here)
export const confirmPayment = async (req, res) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2023-10-16",
    });

    const { paymentIntentId } = req.body;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    const order = await Order.findOne({ paymentIntentId });
    if (!order) return res.status(404).json({ message: "Order not found" });

    // ✅ Record payment
    const payment = new Payment({
      order: order._id,
      user: order.user,
      stripePaymentId: paymentIntent.id,
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency,
      status: paymentIntent.status,
    });
    await payment.save();

    // ✅ Update order + user based on payment status
    if (paymentIntent.status === "succeeded") {
      order.status = "paid";
      await order.save();

      // 👉 mark user as having access to all courses
      await User.findByIdAndUpdate(order.user, { hasPaid: true });
    } else if (paymentIntent.status === "requires_payment_method") {
      order.status = "failed";
      await order.save();
    }

    res.status(200).json({ order, payment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

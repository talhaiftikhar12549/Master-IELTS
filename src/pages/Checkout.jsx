import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ orderId }) => {
  const stripe = useStripe();
  const elements = useElements();

  const {user} = useAuth()
  const navigate = useNavigate()

  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 1. Fetch client secret for this order
  useEffect(() => {
    const fetchIntent = async () => {
      try {
        const res = await api.post("/payments/create-intent", { orderId });
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.error("Error fetching payment intent:", err);
        setMessage("Failed to start checkout. Please try again.");
      }
    };
    if (orderId) fetchIntent();
  }, [orderId]);

  // 2. Handle Stripe payment
 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!stripe || !elements || !clientSecret) return;

  setLoading(true);
  setMessage("");

  const card = elements.getElement(CardElement);

  const { error, paymentIntent } = await stripe.confirmCardPayment(
    clientSecret,
    {
      payment_method: { card },
    }
  );

  if (error) {
    setMessage(error.message || "Payment failed.");
  } else if (paymentIntent.status === "succeeded") {
    setMessage("✅ Payment successful!");

    try {
      // 🔹 Update user as paid
      await api.put(`/users/${user.id}`, { hasPaid: true });
      navigate("/success")
    } catch (err) {
      console.error("Error updating user payment status:", err);
    }

    // Optionally navigate to thank-you or dashboard
    // navigate("/thank-you");
  }

  setLoading(false);
};

  if (!clientSecret) {
    return <p className="text-center mt-20">Preparing checkout...</p>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto p-6 border rounded-lg shadow"
    >
      <CardElement className="p-3 border rounded mb-4" />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
      {message && <p className="mt-4 text-center">{message}</p>}
    </form>
  );
};

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  if (!orderId) {
    return <p className="text-center mt-20">❌ Missing order information.</p>;
  }

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-[500px] p-6 bg-white shadow-md rounded-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>
        <Elements stripe={stripePromise}>
          <CheckoutForm orderId={orderId} />
        </Elements>
      </div>
    </div>
  );
};

export default Checkout;
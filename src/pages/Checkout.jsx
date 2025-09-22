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

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ orderId, plan }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Registration state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  // fetch client secret
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

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
        // Register the user and assign plan
        await api.post("/auth/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          planId: plan._id, // safer: just send the ID
          hasPaid: true,
        });

        navigate("/success");
      } catch (err) {
        console.error("Error creating user after payment:", err);
        setMessage("User creation failed, but payment succeeded.");
      }
    }

    setLoading(false);
  };

  if (!clientSecret) {
    return <p className="text-center mt-20">Preparing checkout...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
      {/* Registration fields */}
      <div className="bg-gray-50 p-4 rounded shadow">
        <h3 className="font-bold mb-2">Register for {plan.title} Plan</h3>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full mb-2 p-2 border rounded"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full mb-2 p-2 border rounded"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full mb-2 p-2 border rounded"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="w-full mb-2 p-2 border rounded"
          onChange={handleChange}
          required
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
        )}
      </div>

      {/* Stripe payment fields */}
      <div className="bg-white p-4 rounded shadow">
        <CardElement className="p-3 border rounded mb-4" />
        <button
          type="submit"
          disabled={!stripe || loading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          {loading
            ? "Processing..."
            : `Pay ${plan.discPrice || plan.actualPrice} USD`}
        </button>
        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </form>
  );
};

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/order/${orderId}`);
        setPlan(res.data.plan);
      } catch (err) {
        console.error("Error fetching order:", err);
      }
    };
    if (orderId) fetchOrder();
  }, [orderId]);

  if (!orderId) {
    return <p className="text-center mt-20">❌ Missing order information.</p>;
  }

  if (!plan) {
    return <p className="text-center mt-20">Loading plan...</p>;
  }

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-[500px] p-6 bg-white shadow-md rounded-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Checkout for {plan.title}
        </h2>
        <Elements stripe={stripePromise}>
          <CheckoutForm orderId={orderId} plan={plan} />
        </Elements>
      </div>
    </div>
  );
};

export default Checkout;

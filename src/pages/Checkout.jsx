import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ orderId }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch client secret from backend
  useEffect(() => {
    const fetchIntent = async () => {
      try {
        const res = await api.post("/payments/create-intent", { orderId });
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        setMessage("Failed to start checkout. Please try again.");
      }
    };
    fetchIntent();
  }, [orderId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setMessage("");

    const card = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card,
        },
      }
    );

    if (error) {
      setMessage(error.message || "Payment failed.");
    } else if (paymentIntent.status === "succeeded") {
      setMessage("✅ Payment successful!");
      // Optionally redirect or update UI
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 border rounded-lg shadow mt-32">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>
      <CardElement className="p-3 border rounded mb-4" />
      <button
        type="submit"
        disabled={!stripe || loading || !clientSecret}
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
  const clientSecret = searchParams.get("clientSecret");
  const orderId = searchParams.get("orderId");

  const [options, setOptions] = useState(null);

  useEffect(() => {
    if (clientSecret) {
      setOptions({
        clientSecret,
        appearance: { theme: "flat" },
      });
    }
  }, [clientSecret]);

  if (!clientSecret) return <p>Missing payment information.</p>;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-[500px] p-6 bg-white shadow-md rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
        {options && (
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm orderId={orderId} />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default Checkout;

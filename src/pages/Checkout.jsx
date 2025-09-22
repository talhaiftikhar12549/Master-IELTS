import { Helmet } from "react-helmet";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import api from "../services/api";
import { FaCheckCircle } from "react-icons/fa";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ orderId, plan }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    setLoading(true);
    setMessage("");

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message || "Payment failed.");
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setMessage("✅ Payment successful!");

      try {
        await api.post("/auth/register", {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          password: formData.password,
          planId: plan._id,
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

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
      {/* Registration */}
      <div className="bg-gray-50 p-4 rounded shadow">
        <h3 className="font-bold mb-3 text-xl">Register</h3>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full mb-2 p-2 border rounded"
          onChange={handleChange}
          required
        />

        <div className="flex space-x-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full mb-2 p-2 border rounded"
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            className="w-full mb-2 p-2 border rounded"
            onChange={handleChange}
          />
        </div>

        <div className="flex space-x-3">
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
        </div>
        <textarea
          name="address"
          placeholder="Address"
          className="w-full mb-2 p-2 border rounded"
          rows={4} // adjust number of visible lines
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
        )}
      </div>

      {/* Stripe Payment */}
      <div className="bg-white p-4 rounded shadow">
        <PaymentElement className="p-3 border rounded mb-4" />
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
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/order/${orderId}`);
        setPlan(res.data.plan);

        const intent = await api.post("/payments/create-intent", { orderId });
        setClientSecret(intent.data.clientSecret);
      } catch (err) {
        console.error("Error fetching order or payment intent:", err);
      }
    };
    if (orderId) fetchData();
  }, [orderId]);

  if (!orderId) {
    return <p className="text-center mt-20">❌ Missing order information.</p>;
  }
  if (!plan || !clientSecret) {
    return <p className="text-center mt-20">Loading checkout...</p>;
  }

  return (
    <div className="max-w-[1450px] lg:px-[40px] xl:px-0 px-[16px] mx-auto flex flex-col items-center pt-20 pb-[200px]">
      <Helmet>
        <title>Checkout</title>
      </Helmet>

      {/* HERO */}
      <div className="w-full flex flex-col text-center py-10 space-y-2">
        <h1 className="font-bold text-[40px]">Checkout</h1>
        <p>Complete your registration and secure your plan!</p>
      </div>

      {/* TWO-COLUMN LAYOUT */}
      <div className="w-full flex flex-col md:flex-row gap-8 justify-center">
        {/* LEFT: PLAN SUMMARY styled like PaymentCard */}
        <div
          className={`w-full md:w-[400px] rounded-3xl shadow-xl pb-5 overflow-hidden min-h-[640px] max-h-[640px] relative ${
            plan.title === "Premium" ? "bg-[#0B65F1] text-white" : "bg-white"
          }`}
        >
          {/* header */}
          <div
            className={`p-4 rounded-t-3xl relative ${
              plan.title === "Premium"
                ? "bg-[#0B65F1] text-white"
                : "bg-blue-200"
            }`}
          >
            <p className="text-[22px] font-extrabold text-center">
              {plan.title}
            </p>
            {plan.offer && (
              <div className="w-1/2 bg-amber-400 absolute -right-14 top-8 rotate-45 flex items-center justify-center">
                <p className="text-[12px] font-bold py-2">{plan.offer}</p>
              </div>
            )}
          </div>

          {/* price */}
          <div className="w-full flex items-end justify-center space-x-4 py-10 pr-5 min-h-[180px]">
            <p
              className={`font-extrabold mb-4 ${
                plan.discPrice ? "text-[32px] line-through" : "text-[68px]"
              }`}
            >
              ${plan.actualPrice}
            </p>
            {plan.discPrice && (
              <div className="flex justify-center items-center text-[68px] font-extrabold">
                <div className="text-4xl mb-5">$</div>
                <p>{plan.discPrice}</p>
              </div>
            )}
          </div>

          {/* description list */}
          {plan.desc?.map((text, index) => (
            <div key={index} className="flex pb-2 px-5">
              <div className="w-[10%]">
                <div
                  className={`bg-transparent ${
                    plan.title === "Premium" ? "text-white" : ""
                  } w-fit text-xl p-1 rounded-full`}
                >
                  <FaCheckCircle />
                </div>
              </div>
              <div className="w-[85%]">
                <p className="text-[16px]">{text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: FORM + PAYMENT */}
        <div className="w-full md:min-w-[800px] md:flex-1 px-5 sm:px-10 py-5 sm:py-10 bg-white shadow-md rounded-xl">
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm orderId={orderId} plan={plan} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

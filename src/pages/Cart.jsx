import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useOutletContext } from "react-router-dom";
import { IoMdTrash } from "react-icons/io";
import api from "../services/api";

const Cart = () => {
  const chooseCourseRef = useOutletContext();

  const handleScroll = () => {
    chooseCourseRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");
      setCart(res.data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async () => {
    try {
      await api.delete(`/cart`);
      setCart(null);
    } catch (err) {
      console.error("Error removing plan:", err);
    }
  };

  const handleClearCart = async () => {
    try {
      await api.delete("/cart");
      setCart(null);
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

  const handleCheckout = async () => {
    try {
      const res = await api.post("/order");
      const orderId = res.data._id;
      navigate(`/checkout?orderId=${orderId}`);
    } catch (err) {
      console.error("Error creating order:", err);
    }
  };

  if (loading) {
    return <p className="p-6">Loading cart...</p>;
  }

  return (
    <div className="w-2/3 lg:px-[40px] xl:px-0 px-[16px] mx-auto flex flex-col items-center pt-20 pb-[200px]">
      <Helmet>
        <title>Cart</title>
      </Helmet>

      {/* HERO */}
      <div className="w-full flex flex-col text-center py-10 space-y-2">
        <h1 className="font-bold text-[40px]">Your Cart</h1>
        <p>Review your selected plan before checkout</p>
      </div>

      {/* CART CONTAINER */}
      <div className="w-full flex justify-center items-center bg-white shadow-xl rounded-md overflow-hidden">
        {cart && cart.plan ? (
          <div className="w-full md:w-[80%] p-6 sm:p-10 flex flex-col gap-6">
            {/* Cart Item */}
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h2 className="text-xl font-semibold">{cart.plan.title}</h2>
                <p className="text-gray-600">
                  Price: ${cart.plan.discPrice || cart.plan.actualPrice} ×{" "}
                  {cart.quantity}
                </p>
                <p className="font-bold mt-1">Subtotal: ${cart.totalPrice}</p>
              </div>
              <button
                onClick={handleRemove}
                className="flex items-center cursor-pointer px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                <IoMdTrash className="mr-2" />
                Remove
              </button>
            </div>

            {/* Summary */}
            <div className="flex flex-col md:flex-row md:justify-between items-center mt-4">
              <h2 className="text-2xl font-bold mb-4 md:mb-0">
                Total: ${cart.totalPrice}
              </h2>
              <div className="flex space-x-4">
                <button
                  onClick={handleClearCart}
                  className="px-6 py-2 bg-gray-500 cursor-pointer text-white rounded-lg hover:bg-gray-600"
                >
                  Clear Cart
                </button>
                <button
                  onClick={handleCheckout}
                  className="px-6 py-2 bg-gradient-to-r cursor-pointer from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full py-20 text-center">
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <button
              onClick={() => {
                navigate("/");
                handleScroll();
              }}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700"
            >
              Go Back Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

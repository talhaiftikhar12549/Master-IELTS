import { useNavigate } from "react-router-dom";
import api from "../../../services/api";

const PaymentCard = ({
  id,
  title,
  actualPrice,
  discPrice,
  offer,
  desc,
  icon,
}) => {
  const navigate = useNavigate();

const handleSelectPlan = async (plan, price) => {
  try {
    // 1. Create an order in backend
    const res = await api.post('/order', { plan, totalAmount: price });
    const orderId = res.data._id;    

    // 2. Create payment intent for that order
    const paymentRes = await api.post('/payments/create-intent', { orderId });
    const clientSecret = paymentRes.data.clientSecret;

    // 3. Redirect user to checkout page (where Stripe Elements is mounted)
    navigate(`/checkout?clientSecret=${clientSecret}&orderId=${orderId}`);
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div
      key={id}
      className={`w-[400px] rounded-3xl shadow-xl pb-5 overflow-hidden
     min-h-[640px] relative ${
       title === "Premium" ? "bg-[#0B65F1] text-white" : "bg-white"
     }`}
    >
      {/* header */}
      <div
        className={`p-4 rounded-t-3xl relative ${
          title === "Premium" ? "bg-[#0B65F1] text-white" : "bg-blue-200"
        }`}
      >
        <p className="text-[22px] font-extrabold text-center">{title}</p>

        {offer && (
          <div className="w-1/2 bg-amber-400 absolute -right-14 top-8 rotate-45 flex items-center justify-center">
            <p className="text-[12px] font-bold py-2">{offer}</p>
          </div>
        )}
      </div>

      {/* price */}
      <div className="w-full flex items-end justify-center space-x-4 py-10 pr-5 min-h-[180px]">
        <p
          className={`font-extrabold mb-4 ${
            title === "Premium" ? "text-[32px] line-through" : "text-[68px]"
          }`}
        >
          ${actualPrice}
        </p>

        {discPrice && (
          <div className="flex justify-center items-center text-[68px] font-extrabold">
            <div className="text-4xl mb-5">$</div>
            <p>{discPrice}</p>
          </div>
        )}
      </div>

      {/* description list */}
      {desc.map((text, index) => (
        <div key={index} className="flex pb-2 px-5">
          <div className="w-[10%]">
            <div
              className={`bg-transparent ${
                title === "Premium" ? "text-white" : ""
              } w-fit text-xl p-1 rounded-full`}
            >
              {icon}
            </div>
          </div>
          <div className="w-[85%]">
            <p className="text-[16px]">{text}</p>
          </div>
        </div>
      ))}

      {/* CTA button */}
      <div className="w-full flex justify-center items-center py-5 absolute bottom-5">
        <button
          onClick={() => handleSelectPlan(title, discPrice || actualPrice)}
          className={`w-fit px-10 py-3 rounded-full 
    ${
      title === "Premium"
        ? "bg-[#fff] text-[#0554F2] hover:bg-white/80"
        : "bg-[#0554F2] text-white hover:bg-blue-500/80"
    }
    font-bold cursor-pointer`}
        >
          Sign up Now!
        </button>
      </div>
    </div>
  );
};

export default PaymentCard;

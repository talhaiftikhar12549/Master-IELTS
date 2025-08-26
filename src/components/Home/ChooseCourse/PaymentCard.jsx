const PaymentCard = ({ title, actualPrice, discPrice, offer, desc, icon }) => {
  return (
    <div className="w-[400px] rounded-3xl shadow-xl p-5 pt-0 bg-white">
      <p className="text-[18px] font-extrabold">{title}</p>

      <p className="text-[18px] font-extrabold py-5">{actualPrice}</p>

      <p className="text-[18px] font-extrabold py-5">{discPrice}</p>

      <p className="text-[18px] font-extrabold py-5">{offer}</p>

      {desc.map((text, index) => {
        return (
          <div className="flex pb-2">
            <div className="w-[10%]">
              <div className="bg-transparent text-black w-fit text-xl p-1 rounded-full">
                {icon}
              </div>
            </div>
            <div className="w-[85%]">
              <p key={index} className="text-[16px]">
                {text}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PaymentCard;

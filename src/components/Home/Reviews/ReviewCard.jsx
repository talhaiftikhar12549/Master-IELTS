const ReviewCard = ({ id, icon, name, desc, band }) => {
  return (
    <div
      key={id}
      className={`w-full rounded-2xl shadow-xl bg-[#0B65F1] min-h-[350px] p-10 pt-5 text-white flex flex-col justify-start items-start relative`}
    >
      <div className="text-white w-fit text-4xl p-1 rounded-full absolute right-4 top-2">
        {icon}
      </div>
      <p className={`text-[40px] font-bold`}>{name}</p>
      <p className={`text-[20px] font-bold pb-5`}>Band {band}</p>
      <div className="w-full bg-white h-[2px] mb-8"></div>
      <p className={`text-[16px]`}>{desc}</p>
    </div>
  );
};

export default ReviewCard;

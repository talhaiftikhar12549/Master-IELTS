const RoadmapCard = ({ key, icon, title, desc, color = "white" }) => {
  return (
    <div key={key} className={`w-[400px] rounded-2xl shadow-xl p-8 ${color === "blue" ? "bg-[#0B65F1]": "bg-white" } flex flex-col justify-center items-center`}>
      <div className="bg-blue-800 text-white w-fit text-4xl p-1 rounded-full">
        {icon}
      </div>
      <p className={`text-[26px] font-extrabold py-5 text-center ${color === "blue" ? "text-white" : ""}`}>{title}</p>

      <p className={`text-[16px] text-center ${color === "blue" ? "text-white" : ""}`}>{desc}</p>
    </div>
  );
};

export default RoadmapCard;

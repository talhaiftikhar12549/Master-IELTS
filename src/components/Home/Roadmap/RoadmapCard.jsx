const RoadmapCard = ({ id, icon, title, desc, color = "white" }) => {
  return (
    <div
      key={id}
      className={`w-full sm:w-[300px] md:w-[350px] lg:w-[280px] xl:w-[350px] 
        rounded-2xl shadow-xl p-6 sm:p-8 
        ${color === "blue" ? "bg-[#0B65F1]" : "bg-white"} 
        flex flex-col justify-center items-center`}
    >
      <div className="bg-blue-800 text-white text-3xl sm:text-4xl p-2 rounded-full">
        {icon}
      </div>

      <p
        className={`text-lg sm:text-xl md:text-2xl lg:text-[26px] font-extrabold py-4 text-center 
          ${color === "blue" ? "text-white" : "text-gray-900"}`}
      >
        {title}
      </p>

      <p
        className={`text-sm sm:text-base md:text-[16px] text-center 
          ${color === "blue" ? "text-white" : "text-gray-700"}`}
      >
        {desc}
      </p>
    </div>
  );
};

export default RoadmapCard;

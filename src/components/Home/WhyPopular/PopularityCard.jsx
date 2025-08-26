const PopularityCard = ({ id, imageURL, title, desc }) => {
  return (
    <div
      key={id}
      className="w-2/3 flex flex-col justify-center items-center p-3"
    >
      <div
        className={`w-full bg-blue-100 rounded-lg justify-between items-center 
       ${id % 2 == 0 ? "flex flex-row-reverse pr-8" : "flex pl-8"}`}
      >
        {/* LHS  */}
        <div className="w-1/2 space-y-2">
          <h2 className="text-[26px] font-bold">{title}</h2>
          <p>{desc}</p>
        </div>

        {/* RHS  */}
        <div className="w-5/12">
          <img
            className={`${id % 2 == 0 ? "rounded-l-lg " : "rounded-r-lg "}`}
            src={imageURL}
            alt="People working on laptop and writing on page"
          />
        </div>
      </div>
    </div>
  );
};

export default PopularityCard;

const PopularityCard = ({ id, imageURL, title, desc }) => {
  return (
    <div
      key={id}
      className="w-full md:w-[90%] xl:w-2/3 flex flex-col justify-center items-center p-3"
    >
      <div
        className={`w-fit md:w-full bg-blue-100 rounded-lg justify-between items-center 
       ${id % 2 == 0 ? "flex flex-col-reverse md:flex-row-reverse md:pr-8" : "flex flex-col-reverse md:flex-row md:pl-8"}`}
      >
        {/* LHS  */}
        <div className="md:w-1/2 space-y-2 p-5 md:pb-0">
          <h2 className="text-[20px] md:text-[26px] font-bold">{title}</h2>
          <p className="text-sm md:text-lg">{desc}</p>
        </div>

        {/* RHS  */}
        <div className="md:w-5/12">
          <img
            className={`${id % 2 == 0 ? "rounded-t-lg md:rounded-l-lg " : "rounded-t-lg md:rounded-r-lg "}`}
            src={imageURL}
            alt="People working on laptop and writing on page"
          />
        </div>
      </div>
    </div>
  );
};

export default PopularityCard;

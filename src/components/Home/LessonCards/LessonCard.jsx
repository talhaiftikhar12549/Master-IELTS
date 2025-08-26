

const LessonCard = ({ imageURL, title, desc }) => {
  return (
    <div className="w-[400px] rounded-lg shadow-xl p-5 bg-white">
      <img
        className="rounded-lg"
        src={imageURL}
        alt="People working on laptop and writing on page"
      />
      <p className="text-[18px] font-extrabold py-5">{title}</p>

      {desc.map((text, index) => {
        return (
          <div key={index} className="flex pb-2">
            <div className="w-[8%]">
            <div className="mt-2 bg-[#0554F2] w-[8px] h-[8px] rounded-full" />
            </div>
            <div className="w-[90%]">
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

export default LessonCard;

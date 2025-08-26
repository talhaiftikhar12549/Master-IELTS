import writing from "../../../assets/Home/writing.jpg";
import PopularityCard from "./PopularityCard";

const CardsData = [
  {
    id: 1,
    imageURL: writing,
    title: "Study at Top Universities Worldwide",
    desc: "Trusted by over 11,000 schools and universities. Many countries, including the UK, Australia, and Canada, require IELTS for student visas. It proves your English skills for admission to top academic institutions.",
  },

  {
    id: 2,
    imageURL: writing,
    title: "Move and Settle Abroad",
    desc: "IELTS is key for immigration to countries like the UK, Australia, New Zealand, and Canada. A good score helps you meet visa requirements for residency, work, or citizenship.",
  },

  {
    id: 3,
    imageURL: writing,
    title: "Boost Your Career",
    desc: "IELTS certification is valued by over 80% of international employers. It opens doors to jobs in fields like business, healthcare, and technology, proving you have the English skills to succeed."
  },
];

const WhyPopular = () => {
  return (
    <div className="w-full flex flex-col py-20 items-center justify-center">
      <h2 className="text-[48px] font-semibold">
        <span className="text-[#0554F2]">Why IELTS</span> is the most popular
        English proficiency test
      </h2>
      <div className="w-full flex flex-col items-center justify-center mt-5">
      {CardsData.map((card) => {
        return (
          <PopularityCard
            id={card.id}
            imageURL={card.imageURL}
            title={card.title}
            desc={card.desc}
          />
        );
      })}

      </div>
    </div>
  );
};

export default WhyPopular;

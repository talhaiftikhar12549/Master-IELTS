import RoadmapCard from "./RoadmapCard";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const cardsData = [
  {
    icon: <IoIosCheckmarkCircleOutline />,
    title: "Enroll today",
    desc: "A hassle-free sign-up gets you instant access to premium courses and resources",
  },

  {
    icon: <IoIosCheckmarkCircleOutline />,
    title: "Learn smart",
    desc: "Dive into expertly crafted lessons and activities that cover all four skills – Reading, Writing, Listening, and Speaking",
    color: "blue",
  },

   {
    icon: <IoIosCheckmarkCircleOutline />,
    title: "Flexible and Accessible",
    desc: "Access the course anytime, anywhere. Allowing flexibility to learn around your commitments.",
  },

   {
    icon: <IoIosCheckmarkCircleOutline />,
    title: "Affordable excellence",
    desc: "Our easy to use portal makes the learning process fun,easy and interactive",
    color: "blue",
  },

   {
    icon: <IoIosCheckmarkCircleOutline />,
    title: "Score big",
    desc: "Walk into the exam with confidence and achieve the 7+ band you’ve been aiming for",
  },

   {
    icon: <IoIosCheckmarkCircleOutline />,
    title: "Track your progress",
    desc: "Stay on top with weekly quizzes, mock tests, and real- time feedback to fine-tune your skills",
    color: "blue",
  },
];

const Roadmap = () => {
  return (
    <div className="w-full flex flex-col py-20 items-center justify-center bg-[#DAE8FD]">
      <h2 className="text-[48px] font-semibold">
        <span className="text-[#0554F2]">Your</span> roadmap to a 7+ IELTS Band
      </h2>

      <div className="w-2/3 grid grid-cols-3 gap-5 mt-10">
        {cardsData.map((card, index) => {
          return (
            <RoadmapCard
              key={index}
              icon={card.icon}
              title={card.title}
              desc={card.desc}
              color={card.color}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Roadmap;

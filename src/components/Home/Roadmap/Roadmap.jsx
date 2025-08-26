import RoadmapCard from "./RoadmapCard";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const cardsData = [
  {
    id: 1,
    icon: <IoIosCheckmarkCircleOutline />,
    title: "Enroll today",
    desc: "A hassle-free sign-up gets you instant access to premium courses and resources",
  },
  {
    id: 2,
    icon: <IoIosCheckmarkCircleOutline />,
    title: "Learn smart",
    desc: "Dive into expertly crafted lessons and activities that cover all four skills – Reading, Writing, Listening, and Speaking",
    color: "blue",
  },
  {
    id: 3,
    icon: <IoIosCheckmarkCircleOutline />,
    title: "Flexible and Accessible",
    desc: "Access the course anytime, anywhere. Allowing flexibility to learn around your commitments.",
  },
  {
    id: 4,
    icon: <IoIosCheckmarkCircleOutline />,
    title: "Affordable excellence",
    desc: "Our easy to use portal makes the learning process fun,easy and interactive",
    color: "blue",
  },
  {
    id: 5,
    icon: <IoIosCheckmarkCircleOutline />,
    title: "Score big",
    desc: "Walk into the exam with confidence and achieve the 7+ band you’ve been aiming for",
  },
  {
    id: 6,
    icon: <IoIosCheckmarkCircleOutline />,
    title: "Track your progress",
    desc: "Stay on top with weekly quizzes, mock tests, and real-time feedback to fine-tune your skills",
    color: "blue",
  },
];

const Roadmap = () => {
  return (
    <div className="w-full flex flex-col py-16 md:py-20 items-center justify-center bg-[#DAE8FD] px-5 md:px-0">
      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl md:text-[48px] font-semibold text-center">
        <span className="text-[#0554F2]">Your</span> roadmap to a 7+ IELTS Band
      </h2>

      {/* Responsive Grid */}
      <div className="w-full md:w-5/6 lg:w-8/12 xl:8/12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {cardsData.map((card) => (
          <RoadmapCard
            key={card.id}
            id={card.id}
            icon={card.icon}
            title={card.title}
            desc={card.desc}
            color={card.color}
          />
        ))}
      </div>
    </div>
  );
};

export default Roadmap;

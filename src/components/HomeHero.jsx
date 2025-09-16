import students from "../assets/Home/students.jpg";
import Counter from "./Home/Hero/Counter";

const HomeHero = ({ chooseCourseRef }) => {
  const handleScroll = () => {
    chooseCourseRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center bg-[#F3F8FF]">
      <div className="relative w-full flex flex-col lg:flex-row items-center justify-between overflow-hidden">
        {/* LHS */}
        <div className="w-full lg:w-1/2 h-full flex flex-col justify-center space-y-8 px-6 lg:pl-12 lg:pr-10 py-16 pt-32 lg:pt-16 z-10">
          <h1 className="text-[38px] md:text-[48px] lg:text-[58px] leading-tight font-bold">
            Get a 7+ IELTS band with proven, practical, and personalised
            coaching
          </h1>

          <p className="text-gray-900 font-medium text-base md:text-lg">
            Access our all-in-one portal packed with expert-led courses,
            interactive quizzes, and practical exercises tailored to help you
            master the IELTS test.
          </p>

          <button
            onClick={handleScroll}
            className="w-fit px-8 py-3 text-white rounded-full bg-[#0554F2] hover:bg-blue-500/80 font-bold cursor-pointer transition-all"
          >
            Let’s Ace it Together!
          </button>
        </div>
        {/* RHS with Gradient */}
        <div className="relative w-full lg:w-1/2 flex justify-end">
          <img
            src={students}
            alt="students group"
            className="w-full h-[400px] lg:h-[650px] object-cover object-right"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#F3F8FF]/10 to-[#F3F8FF]"></div>
        </div>
      </div>

      {/* Counter Section */}
      <div className="w-11/12 md:w-4/5 xl:w-10/12 2xl:w-2/3 bg-[#0554F2] my-16 flex flex-col md:flex-row justify-around items-center rounded-2xl py-4 px-4 text-white space-y-6 md:space-y-0">
        <Counter title={"200+"} desc={"Students"} />
        <Counter title={"7.5"} desc={"Average Score"} />
        <Counter title={"250+"} desc={"Videos and Quizzes"} />
      </div>
    </div>
  );
};

export default HomeHero;

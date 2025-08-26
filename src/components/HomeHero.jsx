import students from "../assets/Home/students.jpg"
import Counter from "./Home/Hero/counter";

const HomeHero = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-[#F3F8FF]">
     <div className="w-full flex justify-between items-center ">

      {/* LHS  */}
      <div className="w-1/2 h-full flex flex-col justify-center space-y-10 pl-10 pr-10 py-20">
        <h1 className="text-[58px] leading-[55px] font-bold">
          Get a 7+ IELTS band with proven, practical, and personalised coaching
        </h1>

        <p className="text-gray-900 font-medium">
          Access our all-in-one portal packed with expert-led courses, interactive quizzes, 
          and practical exercises tailored to help you master the IELTS test
        </p>

        <button className="w-fit px-10 py-3 text-white rounded-full bg-[#0554F2] hover:bg-blue-500/80 font-bold cursor-pointer ">
          Lets Ace it Together!
        </button>
      </div>

      {/* RHS  */}
      <div className="w-1/2 flex justify-end lg:pl-52">
        <img
            src={students}
            alt="students group"
            className="h-[650px] bg-cover"
            style={{
              clipPath:"polygon(50% 0, 100% 0, 100% 100%, 50% 100%, 15% 85%, 0 52%, 15% 14%)"
            }}
        />
      </div>

     
     </div>

      <div className="w-2/3 bg-[#0554F2] my-20 flex justify-around rounded-2xl">
              <Counter title={"200+"} desc={"Students"} />
              <Counter title={"7.5"} desc={"Average Score"} />
              <Counter title={"250+"} desc={"Videos and Quizzes"} />
      </div>
      </div>
  );
};

export default HomeHero;

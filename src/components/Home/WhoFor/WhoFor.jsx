import laptop from "../../../assets/Home/girl-using-laptop.png";
import blob from "../../../assets/Home/blue-blob.svg";
import Checklist from "./Checklist";

const WhoFor = ({ chooseCourseRef }) => {
  const handleScroll = () => {
    chooseCourseRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  

  return (
    <div className="w-full flex flex-col py-16 items-center justify-center bg-[#F3F8FF] px-6">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center">
        <span className="text-[#0554F2]">Who</span> is it for?
      </h2>

      {/* Content Wrapper */}
      <div className="w-full lg:w-2/3 flex flex-col lg:flex-row justify-between items-center mt-12">
        {/* LHS */}
        <div className="w-full lg:w-1/2 h-full flex flex-col justify-center space-y-8 lg:space-y-10 px-4 lg:px-0 py-10">
          <p className="text-gray-900 font-medium text-base md:text-lg">
            Are you aspiring to study abroad, pursue a career overseas, or
            immigrate to an English-speaking country? and having below issues as
            well:
          </p>

          <div className="w-full space-y-4 md:space-y-5">
            <Checklist
              title={"Struggling to find time to study in your busy life?"}
            />
            <Checklist
              title={"Want a flexible course that is tailored to your needs?"}
            />
            <Checklist title={"Finding it hard to motivate yourself?"} />
            <Checklist
              title={"Desire a band 7+ but failing to meet your target?"}
            />
          </div>

          <p className="text-gray-900 font-medium text-base md:text-lg">
            Well this will demand time and money to pass IELTS but we offer a
            simple solution
          </p>

          <button
            onClick={handleScroll}
            className="w-fit px-8 md:px-10 py-3 text-white rounded-full bg-[#0554F2] hover:bg-blue-500/80 font-bold cursor-pointer text-sm md:text-base"
          >
            Sign up Now!
          </button>
        </div>

        {/* RHS */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative mt-10 lg:mt-0">
          <img
            src={blob}
            alt="background blob"
            className="hidden lg:block h-[400px] md:h-[500px] lg:h-[650px] absolute -top-8 lg:-top-10 -right-10 lg:-right-20"
          />
          <img
            src={laptop}
            alt="students group"
            className="h-[280px] md:h-[500px] lg:h-[550px] relative z-10"
          />
        </div>
      </div>
    </div>
  );
};

export default WhoFor;

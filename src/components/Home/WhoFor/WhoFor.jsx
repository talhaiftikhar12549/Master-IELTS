import laptop from "../../../assets/Home/girl-using-laptop.png";
import blob from "../../../assets/Home/blue-blob.svg";
import Checklist from "./Checklist";

const WhoFor = () => {
  return (
    <div className="w-full flex flex-col py-20 items-center justify-center bg-[#F3F8FF]">
      <h2 className="text-[48px] font-semibold"><span className="text-[#0554F2]">Who</span> is it for?</h2>

      <div className="w-2/3 flex justify-between items-center ">
        {/* LHS  */}
        <div className="w-1/2 h-full flex flex-col justify-center space-y-10 pl-10 pr-10 py-20">
          <p className="text-gray-900 font-medium">
            Are you aspiring to study abroad, pursue a career overseas, or
            immigrate to an English-speaking country? and having below issues as
            well:
          </p>

            <div className="w-full space-y-5">
          <Checklist title={"Struggling to find time to study in your busy life?"} />
          <Checklist title={"Want a flexible course that is tailored to your needs?"} />
          <Checklist title={"Finding it hard to motivate yourself?"} />
          <Checklist title={"Desire a band 7+ but failing to meet your target?"} />
            </div>

          <p className="text-gray-900 font-medium">
           Well this will demand time and money to pass IELTS but we offer a simple solution
          </p>

          <button className="w-fit px-10 py-3 text-white rounded-full bg-[#0554F2] hover:bg-blue-500/80 font-bold cursor-pointer ">
            Sign up Now!
          </button>
        </div>

        <div className="w-1/2 flex justify-end pl-20 relative">

           <img src={blob} alt="students group" className="h-[650px] absolute z-1 -top-10 -right-20" />
          <img src={laptop} alt="students group" className="h-[550px] z-2" />

        </div>
      </div>
    </div>
  );
};

export default WhoFor;

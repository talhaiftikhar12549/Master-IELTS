import { FaCheck } from "react-icons/fa6";

const Checklist = ({ title }) => {
  return (
    <div className="flex">
      <div className="w-[7%]">
        <div className="bg-[#0554F2] w-[22px] h-[22px] mt-[3px] rounded-full p-[4px] flex justify-center items-center">
          <FaCheck className="text-white" />
        </div>
      </div>
      <div className="w-[92%]">
        <p className="text-[16px]">{title}</p>
      </div>
    </div>
  );
};

export default Checklist;

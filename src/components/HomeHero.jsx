import React from "react";
import {
  FaChalkboardTeacher,
  FaBookOpen,
  FaPaperPlane,
  FaStar,
} from "react-icons/fa";
import spiralArrow from "../assets/Home/spiralArrow.webp";
const HomeHero = () => {
  return (
    <>
      <section className="bg-gradient-to-b from-blue-100 to-white w-full ">
        <div className="max-w-[1280px] py-[40px] md:py-[48px] px-4 md:px-8 xl:px-0 mx-auto">
          <div className=" py-16 flex justify-center items-center w-full">
            {/* Side Icons - Left */}
            <div className="w-[20%] left-4 top-[20%] flex flex-col gap-8 items-start">
              <div className="flex items-center gap-2">
                <FaPaperPlane className="text-orange-500 text-2xl" />
                <span className="text-sm font-medium text-gray-700">
                  1st step to your
                  <br />
                  dream career
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-500 text-2xl" />
                <span className="text-sm font-medium text-gray-700">
                  Get a 7+
                  <br />
                  Band!
                </span>
              </div>
            </div>

            {/* Center Card */}
            <div className="bg-gradient-to-b from-blue-100 to-white shadow-2xl rounded-3xl px-8 py-12 text-center max-w-2xl w-full relative">
              <h1 className="text-3xl md:text-[46px] font-[900]  mb-4 text-gray-900">
                Master IELTS Online
              </h1>
              <p className="text-gray-700 mb-6 text-3xl">
                An online learning portal with over 250+ structured IELTS
                content created by certified tutors.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg cursor-pointer font-semibold transition duration-300">
                I’m ready for my 7+ IELTS band!
              </button>
              <img
                className="absolute right-[60px] bottom-[54px] max-h-[20%] "
                src={spiralArrow}
                alt="spiral arrow"
              />
            </div>

            {/* Side Icons - Right */}
            <div className="w-[20%]  right-4 top-[20%] flex flex-col gap-8 items-end">
              <div className="flex items-center gap-2">
                <FaBookOpen className="text-blue-500 text-2xl" />
                <span className="text-sm font-medium text-gray-700 text-right">
                  All Modules
                  <br />
                  covered
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaChalkboardTeacher className="text-orange-500 text-2xl" />
                <span className="text-sm font-medium text-gray-700 text-right">
                  Experienced
                  <br />
                  tutors
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeHero;

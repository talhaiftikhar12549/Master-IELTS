import React from "react";
import {
  FaChalkboardTeacher,
  FaBookOpen,
  FaPaperPlane,
  FaStar,
} from "react-icons/fa";

const HomeHero = () => {
  return (
    <>
      <section>
        <div className="relative bg-gradient-to-b from-blue-100 to-white py-16 flex justify-center items-center">
          {/* Side Icons - Left */}
          <div className="absolute left-4 top-[20%] flex flex-col gap-8 items-start">
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
          <div className="bg-white shadow-xl rounded-3xl px-8 py-12 text-center max-w-2xl w-full">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Master IELTS Online
            </h1>
            <p className="text-gray-700 mb-6 text-lg">
              An online learning portal with over 250+ structured IELTS content
              created by certified tutors.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-semibold transition duration-300">
              I’m ready for my 7+ IELTS band!
            </button>
          </div>

          {/* Side Icons - Right */}
          <div className="absolute right-4 top-[20%] flex flex-col gap-8 items-end">
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
      </section>
    </>
  );
};

export default HomeHero;

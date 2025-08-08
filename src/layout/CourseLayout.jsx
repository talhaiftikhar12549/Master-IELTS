import { NavLink, Outlet } from "react-router-dom";
import api from "../services/api";
import { useEffect, useState } from "react";

export const CourseLayout = () => {
  const [coursesData, setCoursesData] = useState(null);

  const getCourses = async () => {
    const res = await api.get("/courses");
    setCoursesData(res.data);
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center mt-10">
      <div className="w-2/3 bg-red-100 space-x-5 flex p-10">
        <div className="w-[70%] border-2 border-blue-500">
          course section
          <Outlet context={coursesData} />
        </div>

        {/* POPULAR COURSES SIDE BAR  */}
        <div className="w-[30%] border-2 border-green-500 p-5">
          <h2 className="text-lg font-semibold mb-4">Popular Courses</h2>

          {coursesData?.map((course) => (
            <NavLink
              key={course._id}
              to={`/course/${course.title.toLowerCase()}`}
              className="w-full flex flex-col p-5 shadow-lg bg-white rounded-lg mt-5 hover:bg-gray-100 transition"
            >
              <p className="capitalize font-medium text-gray-800">{course.title}</p>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

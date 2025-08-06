import { NavLink, Outlet } from "react-router-dom";

export const CourseLayout = () => {
  return (
    <div className="w-full h-full flex items-center justify-center mt-10">
      <div className="w-2/3 bg-red-100 space-x-5 flex p-10">
        <div className="w-[70%] border-2 border-blue-500">
          course section
          <Outlet />
        </div>

        {/* POPULAR COURSES SIDE BAR  */}
        <div className="w-[30%] border-2 border-green-500 p-5">
          <h2 className="text-lg font-semibold mb-4">Popular Courses</h2>

          {["reading", "writing", "listening", "speaking"].map((course) => (
            <NavLink
              key={course}
              to={`/course/${course}`}
              className="w-full flex flex-col p-5 shadow-lg bg-white rounded-lg mt-5 hover:bg-gray-100 transition"
            >
              <p className="capitalize font-medium text-gray-800">{course}</p>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

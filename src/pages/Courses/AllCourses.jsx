import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import api from "../../services/api";

export const AllCourses = () => {
  const [coursesData, setCoursesData] = useState(null);

  const getCourses = async () => {
    const res = await api.get("/courses");
    setCoursesData(res.data);
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden p-10">
      Choose Course
      <div className="w-full p-5 flex flex-wrap gap-5">
        {coursesData &&
          coursesData.map((course) => {
            return (
              <NavLink
                key={course._id}
                to={`/course/${course.title.toLowerCase()}`}
                className="w-1/3 flex flex-col p-5 shadow-lg bg-white rounded-lg mt-5"
              >
                <p>{course.title}</p>
              </NavLink>
            );
          })}
      </div>
    </div>
  );
};

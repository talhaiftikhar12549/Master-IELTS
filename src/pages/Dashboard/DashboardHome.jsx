import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import { NavLink } from "react-router-dom";

export const DashboardHome = () => {
  const { user } = useAuth();

  const [coursesData, setCoursesData] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const fetchLogedinUser = async () => {
    const res = await api.get(`/users/${user.id}`);
    setLoggedInUser(res.data);
  };

  useEffect(() => {
    fetchLogedinUser();
  }, []);

  const getCourses = async () => {
    const res = await api.get("/courses");
    setCoursesData(res.data);
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className="w-full h-full p-10">
      <h2 className="text-xl font-bold">Dashboard</h2>

      <div className="w-full flex justify-start items-center space-x-5 mt-5">
        <div className="w-1/3 flex flex-col p-5 shadow-lg bg-white rounded-lg">
          <p>{loggedInUser?.hasPaid ? "4" : "0"}</p>
          <p>Enrolled Courses</p>
        </div>
      </div>

      <h2 className="mt-10 text-xl font-bold ">My Courses</h2>

      {loggedInUser?.hasPaid ? (
        <div className="w-full flex flex-wrap justify-center items-center gap-5 mt-5">
          {coursesData &&
            coursesData.map((course) => {
              return (
                <NavLink
                  key={course._id}
                  to={`/course/${course.title.toLowerCase()}`}
                  className="w-[49%] h-56 flex flex-col items-center justify-center text-3xl p-5 shadow-lg bg-white hover:bg-blue-500/50 rounded-lg"
                >
                  <p>{course.title}</p>
                </NavLink>
              );
            })}
        </div>
      ) : (
        <div className="w-full flex flex-wrap justify-center items-center gap-5 mt-5">
          <NavLink
            to={`/`}
            className="w-[49%] h-56 flex flex-col items-center justify-center p-5 shadow-lg bg-white hover:bg-blue-500/50 rounded-lg"
          >
            <p>You have not purchased any courses yet!</p>
            <p className="text-blue-700">Purchase Bundle</p>
          </NavLink>
        </div>
      )}
    </div>
  );
};

import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import { NavLink } from "react-router-dom";
import { FaBook, FaCheckCircle } from "react-icons/fa";

export const DashboardHome = () => {
  const { user } = useAuth();

  const [coursesData, setCoursesData] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [coursesProgress, setCoursesProgress] = useState([]);

  // Fetch user
  const fetchLogedinUser = async () => {
    const res = await api.get(`/users/${user.id}`);
    setLoggedInUser(res.data);
  };

  // Fetch courses
  const getCourses = async () => {
    const res = await api.get("/courses");
    setCoursesData(res.data);
  };

  // Fetch progress
  const getProgress = async () => {
    const res = await api.get("/progress");
    setCoursesProgress(res.data);
  };

  useEffect(() => {
    fetchLogedinUser();
    getCourses();
    getProgress();
  }, []);

  return (
    <div className="w-full h-full p-8">
      {/* Dashboard Header */}
      <h2 className="text-3xl font-bold mb-8 text-gray-800">📌 Dashboard</h2>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <p className="text-3xl font-bold text-blue-600">
            {loggedInUser?.hasPaid ? coursesData.length : 0}
          </p>
          <p className="text-gray-600">Enrolled Courses</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <p className="text-3xl font-bold text-green-600">
            {
              coursesProgress.filter(
                (c) => c.totalLessons > 0 && c.completedLessons === c.totalLessons
              ).length
            }
          </p>
          <p className="text-gray-600">Courses Completed</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <p className="text-3xl font-bold text-purple-600">
            {coursesProgress.reduce((acc, c) => acc + c.completedLessons, 0)}
          </p>
          <p className="text-gray-600">Lessons Completed</p>
        </div>
      </div>

      {/* My Courses */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800">📚 My Courses</h2>

      {loggedInUser?.hasPaid ? (
        <div className="space-y-6 pb-20">
          {coursesProgress.map((course) => {
            const percent =
              course.totalLessons > 0
                ? (course.completedLessons / course.totalLessons) * 100
                : 0;

            return (
              <NavLink
                key={course.courseId}
                to={`/course/${course.courseTitle.toLowerCase()}`}
                className="block bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <FaBook className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {course.courseTitle}
                    </h3>
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    {course.completedLessons}/{course.totalLessons} lessons
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden mb-2">
                  <div
                    className="bg-blue-500 h-3 rounded-full transition-all"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>

                {/* Status */}
                <div className="flex items-center gap-2 text-sm">
                  {percent === 100 ? (
                    <>
                      <FaCheckCircle className="text-green-600" />
                      <span className="text-green-700 font-medium">
                        Completed
                      </span>
                    </>
                  ) : (
                    <span className="text-gray-600">
                      Course Completed: {Math.round(percent)}%
                    </span>
                  )}
                </div>
              </NavLink>
            );
          })}
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-xl p-8 text-center">
          <p className="text-gray-600 mb-2">
            You have not purchased any courses yet!
          </p>
          <NavLink
            to={`/?sec=card`}
            className="text-blue-600 font-semibold hover:underline"
          >
            Purchase Bundle
          </NavLink>
        </div>
      )}
    </div>
  );
};

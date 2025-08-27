import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const Sidebar = () => {
  const location = useLocation()
  const {logout} = useAuth();
  
  const linkClasses = ({ isActive }) =>
    `w-full px-5 py-2 rounded-l-full transition duration-200 ${
      isActive ? "bg-blue-500 text-white" : "bg-white text-blue-500"
    }`;

  return (
    <div className="w-[350px] h-[95vh] bg-blue-100 relative p-5 pr-0 border-r border-gray-300">
      <div className="space-y-5 flex flex-col mt-10 items-center h-10/12">
        <NavLink
          to=""
          className={
            `w-full px-5 py-2 rounded-l-full transition duration-200 ${
              location.pathname === "/dashboard" ? "bg-blue-500 text-white" : "bg-white text-blue-500"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink to="quiz-builder" className={linkClasses}>
          Quiz Builder
        </NavLink>

        <NavLink to="create-course" className={linkClasses}>
          Create Courses
        </NavLink>

        <NavLink to="create-topics" className={linkClasses}>
          Create Topics
        </NavLink>

        <NavLink to="create-lessons" className={linkClasses}>
          Create Lessons
        </NavLink>

        <NavLink to="/enrolled-courses" className={linkClasses}>
          Enrolled Courses
        </NavLink>

        <NavLink to="/quiz-attempts" className={linkClasses}>
          Quiz Attempts
        </NavLink>

        <NavLink to="/qa" className={linkClasses}>
          Q & A
        </NavLink>

        <NavLink to="/settings" className={linkClasses}>
          Settings
        </NavLink>
      </div>

      <div className="w-full pr-5">
        <button onClick={logout} className="w-full bg-red-500 px-5 py-2 rounded text-white mb-10 cursor-pointer">
          logout
        </button>
      </div>
    </div>
  );
};

import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FiHome,
  FiFileText,
  FiBookOpen,
  FiLayers,
  FiPlusSquare,
  FiUsers,
  FiEdit,
  FiMessageSquare,
  FiCheckSquare,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { PiStudent } from "react-icons/pi";
import { GiProgression } from "react-icons/gi";
import { FaRegQuestionCircle, FaRegUserCircle } from "react-icons/fa";
import { MdPayment } from "react-icons/md";

export const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 w-full px-5 py-3 rounded-xl transition-all duration-300 font-medium
     ${
       isActive
         ? "bg-blue-500 text-white shadow-md"
         : "text-blue-600 hover:bg-blue-100"
     }`;

  return (
    <div className="w-[280px] h-screen bg-gradient-to-b from-blue-50 to-blue-100/50 border-r border-blue-200 flex flex-col justify-between">
      {/* Menu Links */}
      <div className="flex flex-col mt-10 space-y-2 px-3 overflow-y-auto">
        <NavLink
          to=""
          className={({ isActive }) =>
            `flex items-center gap-3 w-full px-5 py-3 rounded-xl transition-all duration-300 font-medium ${
              location.pathname === "/dashboard"
                ? "bg-blue-500 text-white shadow-md"
                : "text-blue-600 hover:bg-blue-100"
            }`
          }
        >
          <FiHome size={20} />
          Dashboard
        </NavLink>

        <NavLink to="profile" className={linkClasses}>
          <FaRegUserCircle size={20} />
          My Profile
        </NavLink>

        {user && user?.role === "student" && (
          <NavLink to="courses-progress" className={linkClasses}>
            <GiProgression size={20} />
            Courses Progress
          </NavLink>
        )}

        {user && user?.role !== "student" && (
          <>
          <NavLink to="create-plans" className={linkClasses}>
            <MdPayment size={20} />
            Payment Plans
          </NavLink>
          
          <NavLink to="quiz-builder" className={linkClasses}>
            <FiFileText size={20} />
            Quiz Builder
          </NavLink>
          </>
        )}

        {user && user?.role !== "student" && (
          <>
            <NavLink to="students" className={linkClasses}>
              <PiStudent size={20} />
              Students
            </NavLink>

            <NavLink to="create-course" className={linkClasses}>
              <FiBookOpen size={20} />
              Create Courses
            </NavLink>

            <NavLink to="create-topics" className={linkClasses}>
              <FiLayers size={20} />
              Create Topics
            </NavLink>

            <NavLink to="create-lessons" className={linkClasses}>
              <FiPlusSquare size={20} />
              Create Lessons
            </NavLink>

            {/* <NavLink to="/enrolled-courses" className={linkClasses}>
          <FiUsers size={20} />
          Enrolled Courses
        </NavLink> */}

            <NavLink to="create-blogs" className={linkClasses}>
              <FiEdit size={20} />
              Create Blogs
            </NavLink>

            <NavLink to="quiz-attempts" className={linkClasses}>
              <FiCheckSquare size={20} />
              Quiz Attempts Admin
            </NavLink>
          </>
        )}

        {user && user?.role === "student" && (
          <NavLink to="my-quiz-attempts" className={linkClasses}>
            <FiCheckSquare size={20} />
            My Quiz Attempts
          </NavLink>
        )}

        <NavLink to="community" className={linkClasses}>
          <FiMessageSquare size={20} />
          Community
        </NavLink>

        <NavLink to="my-qas" className={linkClasses}>
          <FaRegQuestionCircle size={20} />Q & A
        </NavLink>
      </div>

      {/* Logout Button */}
      <div className="px-5 py-6 mb-20">
        <button
          onClick={logout}
          className="flex items-center justify-center gap-2 w-full bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl font-semibold shadow-md transition-all duration-300"
        >
          <FiLogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div className="w-[350px] h-[95vh] bg-blue-100 relative p-5 pr-0 border-r border-gray-300">
      <div className="space-y-5 flex flex-col mt-10 items-center h-10/12">
        <NavLink to={"/dashboard"} className="w-full bg-blue-500 px-5 py-2 rounded-l-full text-white">
            Dashboard
        </NavLink>

        <NavLink to={"/dashboard"} className="w-full bg-white px-5 py-2 rounded-l-full text-blue-500">
            Enrolled Courses
        </NavLink>

        <NavLink to={"/dashboard"} className="w-full bg-white px-5 py-2 rounded-l-full text-blue-500">
            Quiz Attempts
        </NavLink>

        <NavLink to={"/dashboard"} className="w-full bg-white px-5 py-2 rounded-l-full text-blue-500">
            Q & A
        </NavLink>

         <NavLink to={"/dashboard"} className="w-full bg-white px-5 py-2 rounded-l-full text-blue-500">
            Settings
        </NavLink>
      </div>
        
        <div className="w-full pr-5">
       <button className="w-full bg-red-500 px-5 py-2 rounded text-white mb-10 cursor-pointer">
            logout
        </button>
        </div>
    </div>
  );
};

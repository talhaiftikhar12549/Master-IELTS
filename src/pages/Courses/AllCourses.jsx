import { NavLink } from "react-router-dom";

export const AllCourses = () => {
  return (
    <div className="w-screen h-screen overflow-hidden p-10">
        Choose Course
        
      <div className="w-full p-5 flex flex-wrap gap-5">
        
        <NavLink
          to={"/course/reading"}
          className="w-1/3 flex flex-col p-5 shadow-lg bg-white rounded-lg mt-5"
        >
          <p>Reading</p>
        </NavLink>
        <NavLink
          to={"/course/writing"}
          className="w-1/3 flex flex-col p-5 shadow-lg bg-white rounded-lg mt-5"
        >
          <p>Writing</p>
        </NavLink>
        <NavLink
          to={"/course/listening"}
          className="w-1/3 flex flex-col p-5 shadow-lg bg-white rounded-lg mt-5"
        >
          <p>Listening</p>
        </NavLink>
        <NavLink
          to={"/course/speaking"}
          className="w-1/3 flex flex-col p-5 shadow-lg bg-white rounded-lg mt-5"
        >
          <p>Speaking</p>
        </NavLink>
      </div>
    </div>
  );
};

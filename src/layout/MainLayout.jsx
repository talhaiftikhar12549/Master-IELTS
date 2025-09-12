import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";
import { useRef } from "react";

const MainLayout = () => {
   const chooseCourseRef = useRef(null);

  return (
    <>
      <Navbar />
      <main className="w-full flex flex-col items-center">
        <Outlet context={chooseCourseRef} />
      </main>
    </>
  );
};

export default MainLayout;

import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="w-full flex flex-col items-center">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;

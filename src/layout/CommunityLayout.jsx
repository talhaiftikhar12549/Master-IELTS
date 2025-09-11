import { Outlet } from "react-router-dom";
import { Topbar } from "../components/Dashboard/Topbar";
import { Sidebar } from "../components/Dashboard/Sidebar";

const CommunityLayout = () => {
  return (
  <div className="w-screen h-screen overflow-hidden">
             <Topbar />
 
             <div className="w-full h-full bg-gray-50 flex justify-between pr-52">
            <Sidebar />
 
             <div className="w-full px-10 overflow-y-auto">
             <Outlet />
             </div>
             </div>
         </div>
  );
};

export default CommunityLayout;

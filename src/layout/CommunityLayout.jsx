import { Outlet } from "react-router-dom";
import { Topbar } from "../components/Dashboard/Topbar";

const CommunityLayout = () => {
  return (
  <div className="w-screen h-screen overflow-hidden">
             <Topbar />
 
             <div className="w-full h-full bg-gray-50 flex justify-between pr-52">
            <div className="w-1/3"> Sidebar </div>
 
             <div className="w-full overflow-y-auto">
             <Outlet />
             </div>
             </div>
         </div>
  );
};

export default CommunityLayout;

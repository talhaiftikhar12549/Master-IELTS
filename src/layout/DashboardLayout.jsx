import { Outlet } from "react-router-dom"
import { Topbar } from "../components/Dashboard/Topbar"
import { Sidebar } from "../components/Dashboard/Sidebar"

export const DashboardLayout = ()=> {

    return (
        <div className="w-screen h-screen overflow-hidden">
            <Topbar />

            <div className="w-full h-full bg-gray-50 flex ">
            <Sidebar />

            <div className="w-full overflow-y-auto">
            <Outlet />
            </div>
            </div>
        </div>
    )
}
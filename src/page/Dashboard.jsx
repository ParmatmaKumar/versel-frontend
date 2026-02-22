import { useSelector } from "react-redux"
import Sidebar from "../components/core/Dashboard/Sidebar"
import { Outlet, useLocation } from "react-router-dom"

const Dashboad = () => {

    const {loading:authLoading} = useSelector((state) => state.auth);
    const {loading:profileLoading} = useSelector((state) => state.profile);
    const location = useLocation();
    const isSettingsRoute = location.pathname.startsWith("/dashboard/settings");
    const isAddCourseRoute = location.pathname.startsWith("/dashboard/add-course");

    if (authLoading || profileLoading){
        return (
            <div className="loader">
                Loading...
            </div>
        )
    }
    return (
        <div className="relative flex min-h-[calc(100vh-3.5rem)] gap-3 ">
           <Sidebar/>
           <div className={`h-[calc(100vh-3.5rem)] overflow-auto ${(isSettingsRoute || isAddCourseRoute) ? "no-scrollbar" : ""}`}>
                <div className="w-[1260px] mx-auto py-10">
                    <Outlet/>
                </div>
           </div>
        </div>
    )
}
export default Dashboad

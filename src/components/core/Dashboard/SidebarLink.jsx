import * as Icons from "react-icons/vsc"
import { useDispatch } from "react-redux";
import { matchPath, NavLink, useLocation } from "react-router-dom";

const SidebarLink = ({link,iconName}) =>{
    const Icon = Icons[iconName];
    const location = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route) =>{
        return matchPath({path:route},location.pathname)
    }
    
    return(
         <NavLink
            to={link.path}
            className={`relative px-8 py-2 text-sm font-medium transition-colors ${
                matchRoute(link.path)
                    ? "bg-yellow-400/10 text-yellow-200"
                    : "text-gray-400 hover:bg-white/5 hover:text-gray-100"
            }`}
         >
            <span
                className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-400 ${
                    matchRoute(link.path) ? "opacity-100" : "opacity-0"
                }`}
            />
            <div className="flex items-center gap-x-2">
                <Icon className="text-lg"/>
                <span>{link.name}</span>
            </div>
         </NavLink>
    )
}

export default SidebarLink

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { IoChevronDownSharp } from "react-icons/io5";
import { setToken } from "../../../slices/authSlice.js";
import { setUser } from "../../../slices/profileSlice.js";

const ProfileDropDown = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);
  const containerRef = useRef(null);

  const handleLogout = () => {
    dispatch(setUser(null));
    dispatch(setToken(null));
    localStorage.removeItem("token");
    setOpen(false);
    navigate("/");
  };

  useEffect(() => {
    const onDown = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const initials = `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`.toUpperCase() || "U";

  return (
    <div className="relative" ref={containerRef}>
      {/* Profile trigger */}
      <button
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 h-9 px-2 rounded-full bg-gray-800 text-gray-100 hover:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
        title={`${user?.firstName ?? "User"} ${user?.lastName ?? ""}`}
      >
        {/* avatar (image if available) */}
        {user?.avatar ? (
          <img src={user.avatar} alt="avatar" className="h-8 w-8 rounded-full object-cover" />
        ) : (
          <div className="h-8 w-8 rounded-full bg-yellow-400 text-black flex items-center justify-center font-semibold text-sm">{initials}</div>
        )}
        <IoChevronDownSharp className={`${open ? "rotate-180" : ""} text-base transition-transform`} />
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-md bg-gray-900/95 text-gray-100 shadow-lg ring-1 ring-black/40 z-50 overflow-hidden backdrop-blur" role="menu" aria-label="Profile menu">
          <div className="px-4 py-3 border-b border-gray-700 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-yellow-400 text-black flex items-center justify-center font-semibold text-sm">{initials}</div>
            <div className="truncate">
              <p className="text-sm font-semibold truncate">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            </div>
          </div>

          <Link
            to="/dashboard/my-profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-x-2 px-4 py-2 text-sm text-gray-100 hover:bg-gray-800 transition-colors"
            role="menuitem"
          >
            <VscDashboard className="text-lg" />
            <span>Dashboard</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-x-2 px-4 py-2 text-sm text-red-500 hover:bg-red-800/50 transition-colors"
            role="menuitem"
          >
            <VscSignOut className="text-lg" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropDown;

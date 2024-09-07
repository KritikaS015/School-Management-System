import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaSignOutAlt,
  FaExclamationCircle,
  FaClipboardList,
  FaBook,
} from "react-icons/fa"; // React Icons for sidebar

const StudentSideBar = () => {
  const location = useLocation();

  // Check if the current location matches exactly the given path
  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex flex-col h-full p-4 bg-gray-800">
      <div className="mb-4">
        <Link
          to="/"
          className={`flex items-center p-2 mb-2 rounded-md ${
            isActive("/")
              ? "bg-gray-700 text-blue-500"
              : "hover:bg-gray-700 text-white"
          }`}
        >
          <FaHome className="mr-2 text-lg" />
          <span className="font-medium">Home</span>
        </Link>
        <Link
          to="/Student/subjects"
          className={`flex items-center p-2 mb-2 rounded-md ${
            isActive("/Student/subjects")
              ? "bg-gray-700 text-blue-500"
              : "hover:bg-gray-700 text-white"
          }`}
        >
          <FaClipboardList className="mr-2 text-lg" />
          <span className="font-medium">Subjects</span>
        </Link>
        <Link
          to="/Student/attendance"
          className={`flex items-center p-2 mb-2 rounded-md ${
            isActive("/Student/attendance")
              ? "bg-gray-700 text-blue-500"
              : "hover:bg-gray-700 text-white"
          }`}
        >
          <FaBook className="mr-2 text-lg" />
          <span className="font-medium">Attendance</span>
        </Link>
        <Link
          to="/Student/complain"
          className={`flex items-center p-2 mb-2 rounded-md ${
            isActive("/Student/complain")
              ? "bg-gray-700 text-blue-500"
              : "hover:bg-gray-700 text-white"
          }`}
        >
          <FaExclamationCircle className="mr-2 text-lg" />
          <span className="font-medium">Complain</span>
        </Link>
      </div>

      <hr className="my-4 border-gray-300" />

      <div>
        <div className="text-gray-500 text-xs uppercase mb-2 font-semibold">
          User
        </div>
        <Link
          to="/Student/profile"
          className={`flex items-center p-2 mb-2 rounded-md ${
            isActive("/Student/profile")
              ? "bg-gray-700 text-blue-500"
              : "hover:bg-gray-700 text-white"
          }`}
        >
          <FaUser className="mr-2 text-lg" />
          <span className="font-medium">Profile</span>
        </Link>
        <Link
          to="/logout"
          className={`flex items-center p-2 mb-2 rounded-md ${
            isActive("/logout")
              ? "bg-gray-700 text-blue-500"
              : "hover:bg-gray-700 text-white"
          }`}
        >
          <FaSignOutAlt className="mr-2 text-lg" />
          <span className="font-medium">Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default StudentSideBar;

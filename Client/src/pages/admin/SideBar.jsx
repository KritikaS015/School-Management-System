import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaSignOutAlt,
  FaUserCircle,
  FaBullhorn,
  FaChalkboardTeacher,
  FaRegListAlt,
  FaRegFileAlt,
  FaUsers,
  FaTimes, // Import close icon
} from "react-icons/fa";

const SideBar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const isActive = (path) => {
    // Exact match for path "/"
    return path === "/"
      ? location.pathname === path
      : location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Overlay when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10"
          onClick={toggleSidebar} // Clicks on overlay will close the sidebar
        ></div>
      )}
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen w-64 bg-gray-800 text-white p-4 transform transition-transform duration-300 z-20 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-white"
          onClick={(e) => {
            e.stopPropagation(); // Prevent the sidebar toggle when clicking inside
            toggleSidebar();
          }}
        >
          <FaTimes className="w-6 h-6" />
        </button>
        {/* Sidebar Links */}
        <div className="flex flex-col space-y-2 mt-8">
          <Link
            to="/"
            className={`flex items-center p-2 rounded-lg hover:bg-gray-700 ${
              isActive("/") ? "bg-gray-700" : ""
            }`}
          >
            <FaHome className="w-6 h-6 mr-3" />
            <span>Home</span>
          </Link>
          <Link
            to="/Admin/classes"
            className={`flex items-center p-2 rounded-lg hover:bg-gray-700 ${
              isActive("/Admin/classes") ? "bg-gray-700" : ""
            }`}
          >
            <FaChalkboardTeacher className="w-6 h-6 mr-3" />
            <span>Classes</span>
          </Link>
          <Link
            to="/Admin/subjects"
            className={`flex items-center p-2 rounded-lg hover:bg-gray-700 ${
              isActive("/Admin/subjects") ? "bg-gray-700" : ""
            }`}
          >
            <FaRegListAlt className="w-6 h-6 mr-3" />
            <span>Subjects</span>
          </Link>
          <Link
            to="/Admin/teachers"
            className={`flex items-center p-2 rounded-lg hover:bg-gray-700 ${
              isActive("/Admin/teachers") ? "bg-gray-700" : ""
            }`}
          >
            <FaRegFileAlt className="w-6 h-6 mr-3" />
            <span>Teachers</span>
          </Link>
          <Link
            to="/Admin/students"
            className={`flex items-center p-2 rounded-lg hover:bg-gray-700 ${
              isActive("/Admin/students") ? "bg-gray-700" : ""
            }`}
          >
            <FaUsers className="w-6 h-6 mr-3" />
            <span>Students</span>
          </Link>
          <Link
            to="/Admin/notices"
            className={`flex items-center p-2 rounded-lg hover:bg-gray-700 ${
              isActive("/Admin/notices") ? "bg-gray-700" : ""
            }`}
          >
            <FaBullhorn className="w-6 h-6 mr-3" />
            <span>Notices</span>
          </Link>
          <Link
            to="/Admin/complains"
            className={`flex items-center p-2 rounded-lg hover:bg-gray-700 ${
              isActive("/Admin/complains") ? "bg-gray-700" : ""
            }`}
          >
            <FaUser className="w-6 h-6 mr-3" />
            <span>Complains</span>
          </Link>
        </div>
        <hr className="my-4 border-gray-600" />
        <div className="flex flex-col space-y-2">
          <div className="text-gray-400 text-sm uppercase font-semibold mb-2">
            User
          </div>
          <Link
            to="/Admin/profile"
            className={`flex items-center p-2 rounded-lg hover:bg-gray-700 ${
              isActive("/Admin/profile") ? "bg-gray-700" : ""
            }`}
          >
            <FaUserCircle className="w-6 h-6 mr-3" />
            <span>Profile</span>
          </Link>
          <Link
            to="/logout"
            className={`flex items-center p-2 rounded-lg hover:bg-gray-700 ${
              isActive("/logout") ? "bg-gray-700" : ""
            }`}
          >
            <FaSignOutAlt className="w-6 h-6 mr-3" />
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SideBar;

import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Logout from "../Logout";
import StudentSideBar from "./StudentSideBar";
import StudentHomePage from "./StudentHomePage";
import StudentProfile from "./StudentProfile";
import StudentSubjects from "./StudentSubjects";
import ViewStdAttendance from "./ViewStdAttendance";
import StudentComplain from "./StudentComplain";
import AccountMenu from "../../components/AccountMenu";

// Menu Icon Component (assuming you are using React Icons)
import { FiMenu } from "react-icons/fi"; // Replace with your preferred icon library

const StudentDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to handle sidebar toggle

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className="flex">
      {/* Top Navbar */}
      <div className="fixed w-full bg-[#03346E] text-white z-10">
        <div className="flex justify-between items-center p-4">
          {/* Menu Icon and Title */}
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 text-white hover:bg-blue-500 rounded"
            >
              <FiMenu size={24} />
            </button>
            <h1 className="text-xl font-bold ml-4">Student Dashboard</h1>
          </div>

          {/* Account Menu */}
          <AccountMenu />
        </div>
      </div>
      {/* Sidebar */}
      {isSidebarOpen && (
        <div
          className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 z-20 transition-transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
          <div className="flex justify-end p-4">
            <button onClick={toggleSidebar}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="px-4">
            <StudentSideBar />
          </div>
        </div>
      )}
      {/* Main Content Area */}
      <main className="flex-grow bg-[#EDF2F6] min-h-screen pt-16">
        <Routes>
          <Route path="/" element={<StudentHomePage />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/Student/dashboard" element={<StudentHomePage />} />
          <Route path="/Student/profile" element={<StudentProfile />} />
          <Route path="/Student/subjects" element={<StudentSubjects />} />
          <Route path="/Student/attendance" element={<ViewStdAttendance />} />
          <Route path="/Student/complain" element={<StudentComplain />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </main>
    </div>
  );
};

export default StudentDashboard;

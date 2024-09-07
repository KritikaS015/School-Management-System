import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import TeacherSideBar from "./TeacherSideBar";
import Logout from "../Logout";
import AccountMenu from "../../components/AccountMenu";
import StudentAttendance from "../admin/studentRelated/StudentAttendance"; // Adjusted path
import TeacherClassDetails from "./TeacherClassDetails";
import TeacherComplain from "./TeacherComplain";
import TeacherHomePage from "./TeacherHomePage";
import TeacherProfile from "./TeacherProfile";
import TeacherViewStudent from "./TeacherViewStudent";
import StudentExamMarks from "../admin/studentRelated/StudentExamMarks"; // Adjusted path

// Menu Icon Component (using React Icons)
import { FiMenu } from "react-icons/fi";

const TeacherDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Initialize sidebar as closed

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar open/close
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
            <h1 className="text-xl font-bold ml-4">Teacher Dashboard</h1>
          </div>

          {/* Account Menu */}
          <AccountMenu />
        </div>
      </div>

      {/* Sidebar */}
      <TeacherSideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content Area */}
      <main className="flex-grow bg-[#EDF2F6] min-h-screen pt-16">
        <Routes>
          <Route path="/" element={<TeacherHomePage />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/Teacher/dashboard" element={<TeacherHomePage />} />
          <Route path="/Teacher/profile" element={<TeacherProfile />} />

          <Route path="/Teacher/complain" element={<TeacherComplain />} />
          <Route path="/Teacher/class" element={<TeacherClassDetails />} />
          <Route
            path="/Teacher/class/student/:id"
            element={<TeacherViewStudent />}
          />

          <Route
            path="/Teacher/class/student/attendance/:studentID/:subjectID"
            element={<StudentAttendance situation="Subject" />} // Adjusted path
          />
          <Route
            path="/Teacher/class/student/marks/:studentID/:subjectID"
            element={<StudentExamMarks situation="Subject" />} // Adjusted path
          />

          <Route path="/logout" element={<Logout />} />
        </Routes>
      </main>
    </div>
  );
};

export default TeacherDashboard;

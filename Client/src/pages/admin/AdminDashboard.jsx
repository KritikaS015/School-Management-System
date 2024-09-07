import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import SideBar from "./SideBar";
import Logout from "../Logout";
import AdminProfile from "./AdminProfile";
import AdminHomePage from "./AdminHomePage";
import AccountMenu from "../../components/AccountMenu";

// Student-related components
import AddStudent from "./studentRelated/AddStudent";
import SeeComplains from "./studentRelated/SeeComplains";
import ShowStudents from "./studentRelated/ShowStudents";
import StudentAttendance from "./studentRelated/StudentAttendance";
import StudentExamMarks from "./studentRelated/StudentExamMarks";
import ViewStudent from "./studentRelated/ViewStudent";

// Notice-related components
import AddNotice from "./noticeRelated/AddNotice";
import ShowNotices from "./noticeRelated/ShowNotices";

// Subject-related components
import ShowSubjects from "./subjectRelated/ShowSubjects";
import SubjectForm from "./subjectRelated/SubjectForm";
import ViewSubject from "./subjectRelated/ViewSubject";

// Teacher-related components
import AddTeacher from "./teacherRelated/AddTeacher";
import ChooseClass from "./teacherRelated/ChooseClass";
import ChooseSubject from "./teacherRelated/ChooseSubject";
import ShowTeachers from "./teacherRelated/ShowTeachers";
import TeacherDetails from "./teacherRelated/TeacherDetails";

// Class-related components
import AddClass from "./classRelated/AddClass";
import ClassDetails from "./classRelated/ClassDetails";
import ShowClasses from "./classRelated/ShowClasses";

// Menu Icon Component
import { FiMenu } from "react-icons/fi"; // Replace with your preferred icon library

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to handle sidebar toggle

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
            <h1 className="text-xl font-bold ml-4">Admin Dashboard</h1>
          </div>

          {/* Account Menu */}
          <AccountMenu />
        </div>
      </div>
      {/* Sidebar */}
      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      {/* Main Content Area */}
      <main className="flex-grow bg-[#EDF2F6] min-h-screen pt-16">
        <Routes>
          <Route path="/" element={<AdminHomePage />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/Admin/dashboard" element={<AdminHomePage />} />
          <Route path="/Admin/profile" element={<AdminProfile />} />
          <Route path="/Admin/complains" element={<SeeComplains />} />

          {/* Notice */}
          <Route path="/Admin/addnotice" element={<AddNotice />} />
          <Route path="/Admin/notices" element={<ShowNotices />} />

          {/* Subject */}
          <Route path="/Admin/subjects" element={<ShowSubjects />} />
          <Route
            path="/Admin/subjects/subject/:classID/:subjectID"
            element={<ViewSubject />}
          />
          <Route
            path="/Admin/subjects/chooseclass"
            element={<ChooseClass situation="Subject" />}
          />
          <Route path="/Admin/addsubject/:id" element={<SubjectForm />} />
          <Route
            path="/Admin/class/subject/:classID/:subjectID"
            element={<ViewSubject />}
          />
          <Route
            path="/Admin/subject/student/attendance/:studentID/:subjectID"
            element={<StudentAttendance situation="Subject" />}
          />
          <Route
            path="/Admin/subject/student/marks/:studentID/:subjectID"
            element={<StudentExamMarks situation="Subject" />}
          />

          {/* Class */}
          <Route path="/Admin/addclass" element={<AddClass />} />
          <Route path="/Admin/classes" element={<ShowClasses />} />
          <Route path="/Admin/classes/class/:id" element={<ClassDetails />} />
          <Route
            path="/Admin/class/addstudents/:id"
            element={<AddStudent situation="Class" />}
          />

          {/* Student */}
          <Route
            path="/Admin/addstudents"
            element={<AddStudent situation="Student" />}
          />
          <Route path="/Admin/students" element={<ShowStudents />} />
          <Route path="/Admin/students/student/:id" element={<ViewStudent />} />
          <Route
            path="/Admin/students/student/attendance/:id"
            element={<StudentAttendance situation="Student" />}
          />
          <Route
            path="/Admin/students/student/marks/:id"
            element={<StudentExamMarks situation="Student" />}
          />

          {/* Teacher */}
          <Route path="/Admin/teachers" element={<ShowTeachers />} />
          <Route
            path="/Admin/teachers/teacher/:id"
            element={<TeacherDetails />}
          />
          <Route
            path="/Admin/teachers/chooseclass"
            element={<ChooseClass situation="Teacher" />}
          />
          <Route
            path="/Admin/teachers/choosesubject/:id"
            element={<ChooseSubject situation="Norm" />}
          />
          <Route
            path="/Admin/teachers/choosesubject/:classID/:teacherID"
            element={<ChooseSubject situation="Teacher" />}
          />
          <Route
            path="/Admin/teachers/addteacher/:id"
            element={<AddTeacher />}
          />

          {/* Logout */}
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;

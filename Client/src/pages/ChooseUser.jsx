import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/userRelated/userHandle";
import { AiOutlineUser, AiOutlineHome, AiOutlineGroup } from "react-icons/ai";
import ToastNotification from "../components/ToastNotification";

// Import your images
import adminImage from "../assets/logo.webp";
import studentImage from "../assets/children.webp";
import teacherImage from "../assets/teachers.webp";

// Import your background image
import backgroundImage from "../assets/4.avif"; // Adjust the path to your image

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = "zxc";

  const { status, currentUser, currentRole } = useSelector(
    (state) => state.user
  );

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    if (user === "Admin") {
      navigate("/Adminlogin");
    } else if (user === "Student") {
      navigate("/Studentlogin");
    } else if (user === "Teacher") {
      navigate("/Teacherlogin");
    }
  };

  useEffect(() => {
    if (status === "success" || currentUser !== null) {
      if (currentRole === "Admin") {
        navigate("/Admin/dashboard");
      } else if (currentRole === "Student") {
        navigate("/Student/dashboard");
      } else if (currentRole === "Teacher") {
        navigate("/Teacher/dashboard");
      }
    } else if (status === "error") {
      setLoader(false);
      setMessage("Network Error");
      setShowPopup(true);
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <div
      className="h-screen flex items-center justify-center p-8 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className="bg-gray-800 text-white p-8 rounded-lg shadow-lg flex flex-col items-center cursor-pointer hover:bg-gray-600 transition-transform transform hover:scale-105"
          onClick={() => navigateHandler("Admin")}
        >
          <img
            src={adminImage}
            alt="Admin"
            className="w-32 h-32 object-cover rounded-full mb-4"
          />
          <h2 className="text-2xl mb-2">Admin</h2>
          <p className="text-center">
            Login as an administrator to access the dashboard to manage app
            data.
          </p>
        </div>
        <div
          className="bg-gray-800 text-white p-8 rounded-lg shadow-lg flex flex-col items-center cursor-pointer hover:bg-gray-600 transition-transform transform hover:scale-105"
          onClick={() => navigateHandler("Student")}
        >
          <img
            src={studentImage}
            alt="Student"
            className="w-32 h-32 object-cover rounded-full mb-4"
          />
          <h2 className="text-2xl mb-2">Student</h2>
          <p className="text-center">
            Login as a student to explore course materials and assignments.
          </p>
        </div>
        <div
          className="bg-gray-800 text-white p-8 rounded-lg shadow-lg flex flex-col items-center cursor-pointer hover:bg-gray-600 transition-transform transform hover:scale-105"
          onClick={() => navigateHandler("Teacher")}
        >
          <img
            src={teacherImage}
            alt="Teacher"
            className="w-32 h-32 object-cover rounded-full mb-4"
          />
          <h2 className="text-2xl mb-2">Teacher</h2>
          <p className="text-center">
            Login as a teacher to create courses, assignments, and track student
            progress.
          </p>
        </div>
      </div>
      {loader && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="text-white">
            <div className="flex items-center">
              <svg
                className="animate-spin h-8 w-8 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 0116 0A8 8 0 014 12z"
                ></path>
              </svg>
              <span>Please Wait</span>
            </div>
          </div>
        </div>
      )}
      <ToastNotification message={message} type="error" />
    </div>
  );
};

export default ChooseUser;

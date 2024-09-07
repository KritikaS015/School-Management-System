import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // React Icons for avatar
import {
  FaBirthdayCake,
  FaTransgender,
  FaEnvelope,
  FaPhone,
  FaHome,
  FaUserFriends,
} from "react-icons/fa"; // React Icons for personal info

const StudentProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) {
    console.log(response);
  } else if (error) {
    console.log(error);
  }

  const sclassName = currentUser.sclassName;
  const studentSchool = currentUser.school;

  return (
    <div className="container mx-auto p-4 max-w-4xl bg-black mt-3">
      {/* Profile Card */}
      <div
        className="shadow-lg rounded-lg p-6 mb-6 border border-gray-300"
        style={{
          background: "linear-gradient(to right, #7954ff, #ffffff)", // Light blue to white gradient
        }}
      >
        <div className="flex justify-center mb-4">
          <div className="relative w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center text-4xl text-blue-600">
            {String(currentUser.name).charAt(0)}
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800">
            {currentUser.name}
          </h2>
          <p className="text-lg text-gray-700">
            Student Roll No: {currentUser.rollNum}
          </p>
          <p className="text-lg text-gray-700">
            Class: {sclassName.sclassName}
          </p>
          <p className="text-lg text-gray-700">
            School: {studentSchool.schoolName}
          </p>
        </div>
      </div>
      {/* Personal Information Card */}
      <div
        className="shadow-lg rounded-lg p-6 border border-gray-300"
        style={{
          background: "linear-gradient(to right, #dbe6f6, #ffffff)", // Light blue to white gradient
        }}
      >
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center text-gray-600">
            <FaBirthdayCake className="text-blue-500 mr-2" />
            <p>
              <strong>Date of Birth:</strong> January 1, 2000
            </p>
          </div>
          <div className="flex items-center text-gray-600">
            <FaTransgender className="text-blue-500 mr-2" />
            <p>
              <strong>Gender:</strong> Female
            </p>
          </div>
          <div className="flex items-center text-gray-600">
            <FaEnvelope className="text-blue-500 mr-2" />
            <p>
              <strong>Email:</strong> Shreya1@example.com
            </p>
          </div>
          <div className="flex items-center text-gray-600">
            <FaPhone className="text-blue-500 mr-2" />
            <p>
              <strong>Phone:</strong> (123) 456-7890
            </p>
          </div>
          <div className="flex items-center text-gray-600">
            <FaHome className="text-blue-500 mr-2" />
            <p>
              <strong>Address:</strong> 123 Main Street, City, Country
            </p>
          </div>
          <div className="flex items-center text-gray-600">
            <FaUserFriends className="text-blue-500 mr-2" />
            <p>
              <strong>Emergency Contact:</strong> (987) 654-3210
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;

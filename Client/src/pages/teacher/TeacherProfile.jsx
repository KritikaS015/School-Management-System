import React from "react";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa"; // Example icon for profile photo/logo

const TeacherProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) {
    console.log(response);
  } else if (error) {
    console.log(error);
  }

  const teachSclass = currentUser.teachSclass;
  const teachSubject = currentUser.teachSubject;
  const teachSchool = currentUser.school;

  return (
    <div className="p-6 bg-blue-100 shadow-lg rounded-xl mx-auto my-6 max-w-xs lg:max-w-md xl:max-w-lg">
      <div className="flex flex-col items-center">
        <div className="bg-blue-500 rounded-full p-4 mb-4 flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24">
          {/* Replace this with the actual profile photo/logo */}
          <FaUserCircle className="text-white text-3xl sm:text-4xl" />
        </div>
        <div className="flex flex-col items-center">
          <p className="text-lg font-medium text-gray-700 mb-2">
            Name: {currentUser.name}
          </p>
          <p className="text-lg font-medium text-gray-700 mb-2">
            Email: {currentUser.email}
          </p>
          <p className="text-lg font-medium text-gray-700 mb-2">
            Class: {teachSclass.sclassName}
          </p>
          <p className="text-lg font-medium text-gray-700 mb-2">
            Subject: {teachSubject.subName}
          </p>
          <p className="text-lg font-medium text-gray-700 mb-2">
            School: {teachSchool.schoolName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;

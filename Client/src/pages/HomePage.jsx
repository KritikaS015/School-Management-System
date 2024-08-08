import React from "react";
import { Link } from "react-router-dom";
import Students from "../assets/modern-school-building-in-summer.webp";
import Navbar from "../components/Navbar"; // Import Navbar
import "./Homepage.css"; // Make sure to include the custom CSS file

const Homepage = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      <Navbar /> {/* Add Navbar here */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${Students})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(1px)",
          height: "100%",
          width: "100%",
        }}
      >
        {/* Background blur effect */}
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center">
        <div className="bg-black bg-opacity-60 p-4 rounded-md max-w-md mx-auto flex flex-col items-center lg:mt-12 sm:mt-8 xs:mt-4">
          <div className="text-2xl font-bold text-white mb-6 text-center sm:text-xl xs:text-lg lg:text-3xl">
            Welcome to
            <br />
            School Management
            <br />
            System
          </div>
          <p className="text-base text-gray-300 mb-4 text-center sm:text-sm xs:text-xs lg:text-sm">
            Streamline school management, class organization, and add students
            and faculty. Seamlessly track attendance, assess performance, and
            provide feedback. Access records, view marks, and communicate
            effortlessly.
          </p>
          <div className="flex flex-col items-center gap-4">
            <Link to="/choose" className="w-full">
              <button className="bg-purple-600 text-white py-2 px-4 rounded w-full">
                Login
              </button>
            </Link>
            <Link to="/chooseasguest" className="w-full">
              <button className="border border-purple-600 text-purple-600 py-2 px-4 rounded w-full mt-2 mb-3">
                Login as Guest
              </button>
            </Link>
            <p className="text-gray-200 text-center text-sm xs:text-xs lg:text-[15px]">
              Don't have an account?{" "}
              <Link to="/Adminregister" className="text-purple-300">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;

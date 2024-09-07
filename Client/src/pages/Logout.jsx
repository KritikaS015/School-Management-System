import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authLogout } from "../redux/userRelated/userSlice";
import bgpic from "../assets/login.jpg";

const Logout = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authLogout());
    navigate("/");
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgpic})` }}
    >
      {/* Outer container for double border effect */}
      <div className="relative bg-[rgba(255,255,255,0.9)] w-full sm:w-3/4 md:w-1/2 lg:w-2/5 xl:w-1/3 p-8 shadow-lg rounded-md">
        {/* Outer Border */}
        <div
          className="absolute inset-0 border-4 border-black rounded-md pointer-events-none"
          style={{ margin: "8px" }}
        ></div>
        {/* Inner container */}
        <div className="relative z-10 text-center">
          <h1 className="text-4xl mb-4 text-gray-800 font-bold">
            {currentUser.name}
          </h1>
          <p className="text-lg mb-6">Are you sure you want to log out?</p>
          <div className="space-y-4">
            <button
              onClick={handleLogout}
              className="w-full py-2 px-4 rounded-md text-white font-semibold bg-gradient-to-r from-black via-gray-700 to-gray-600 transition-all duration-300 ease-in-out transform hover:from-gray-700 hover:to-black hover:outline hover:outline-white hover:outline-2 hover:outline-offset-2 focus:outline-none"
            >
              Log Out
            </button>
            <button
              onClick={handleCancel}
              className="w-full bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;

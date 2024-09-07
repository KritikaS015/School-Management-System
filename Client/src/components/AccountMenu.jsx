import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const AccountMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentRole, currentUser } = useSelector((state) => state.user);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative flex items-center">
      <button
        onClick={handleToggle}
        className="ml-2 flex items-center justify-center w-10 h-10 bg-white text-black uppercase font-bold rounded-full"
      >
        <span className="text-lg">{String(currentUser.name).charAt(0)}</span>
      </button>
      {isOpen && (
        <div
          className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg z-10"
          onMouseLeave={handleClose}
        >
          <div className="py-1">
            <Link
              to={`/${currentRole}/profile`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-400 text-white flex items-center justify-center">
                  <span className="text-lg">
                    {String(currentUser.name).charAt(0)}
                  </span>
                </div>
                <span className="ml-3">Profile</span>
              </div>
            </Link>
          </div>
          <div className="border-t border-gray-200"></div>
          <div className="py-1">
            <button
              onClick={handleClose}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <div className="flex items-center">
                <span className="mr-2">⚙️</span>Settings
              </div>
            </button>
            <Link
              to="/logout"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <div className="flex items-center">
                <span className="mr-2">🚪</span>Logout
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountMenu;

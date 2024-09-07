import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaSchool } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 text-white p-2 fixed top-0 w-full z-10 border-b border-[#919294]">
      <div className="container mx-auto flex justify-between items-center">
        {/* Flex container for logo and text */}
        <div className="flex items-center">
          {/* School icon */}
          <FaSchool className="text-xl lg:text-2xl mr-2 lg:mr-4" />
          {/* Title */}
          <Link to="/" className="text-xl lg:text-2xl font-bold">
            Glorious Public School
          </Link>
        </div>
        <div className="block lg:hidden">
          <button onClick={toggleMenu} className="text-2xl">
            <FaBars />
          </button>
        </div>
        <div className={`hidden lg:flex lg:space-x-4`}>
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/about" className="hover:underline">
            About
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
        </div>
      </div>

      {/* Dropdown menu for mobile */}
      <div
        className={`absolute top-full right-0 bg-gray-800 text-white p-4 transition-transform transform ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        } lg:hidden w-30 z-20`}
      >
        <div className={`flex flex-col ${isOpen ? "block" : "hidden"}`}>
          <Link
            to="/"
            className="block py-2 hover:underline"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block py-2 hover:underline"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block py-2 hover:underline"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

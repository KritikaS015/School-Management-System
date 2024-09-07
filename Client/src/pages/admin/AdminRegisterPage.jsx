import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaEye as Visibility,
  FaEyeSlash as VisibilityOff,
  FaSpinner as CircularProgress,
} from "react-icons/fa";
import { registerUser } from "../../redux/userRelated/userHandle";
import Popup from "../../components/Popup";
import backgroundImage from "../../assets/1.jpg";

const AdminRegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, currentUser, response, error, currentRole } = useSelector(
    (state) => state.user
  );

  const [toggle, setToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [adminNameError, setAdminNameError] = useState(false);
  const [schoolNameError, setSchoolNameError] = useState(false);
  const role = "Admin";

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = event.target.adminName.value;
    const schoolName = event.target.schoolName.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (!name || !schoolName || !email || !password) {
      if (!name) setAdminNameError(true);
      if (!schoolName) setSchoolNameError(true);
      if (!email) setEmailError(true);
      if (!password) setPasswordError(true);
      return;
    }

    const fields = { name, email, password, role, schoolName };
    setLoader(true);
    dispatch(registerUser(fields, role));
  };

  const handleInputChange = (event) => {
    const { name } = event.target;
    if (name === "email") setEmailError(false);
    if (name === "password") setPasswordError(false);
    if (name === "adminName") setAdminNameError(false);
    if (name === "schoolName") setSchoolNameError(false);
  };

  useEffect(() => {
    if (
      status === "success" ||
      (currentUser !== null && currentRole === "Admin")
    ) {
      navigate("/Admin/dashboard");
    } else if (status === "failed") {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === "error") {
      console.log(error);
    }
  }, [status, currentUser, currentRole, navigate, error, response]);

  return (
    <div
      className=" flex items-center justify-center min-h-screen p-4 sm:p-8"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex flex-col w-full max-w-md p-6 sm:p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
          Admin Register
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mb-4">
          Create your own school by registering as an admin. You will be able to
          add students and faculty and manage the system.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="adminName"
              className="block text-sm sm:text-base font-medium text-gray-700"
            >
              Enter your name
            </label>
            <input
              id="adminName"
              name="adminName"
              type="text"
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${
                adminNameError ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              onChange={handleInputChange}
            />
            {adminNameError && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                Name is required
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="schoolName"
              className="block text-sm sm:text-base font-medium text-gray-700"
            >
              Create your school name
            </label>
            <input
              id="schoolName"
              name="schoolName"
              type="text"
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${
                schoolNameError ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              onChange={handleInputChange}
            />
            {schoolNameError && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                School name is required
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm sm:text-base font-medium text-gray-700"
            >
              Enter your email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${
                emailError ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              onChange={handleInputChange}
            />
            {emailError && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                Email is required
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm sm:text-base font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={toggle ? "text" : "password"}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${
                  passwordError ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                onChange={handleInputChange}
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={() => setToggle(!toggle)}
              >
                {toggle ? <Visibility /> : <VisibilityOff />}
              </div>
            </div>
            {passwordError && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                Password is required
              </p>
            )}
          </div>
          <div className="flex items-center mb-4">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label
              htmlFor="remember"
              className="ml-2 block text-sm sm:text-base text-gray-900"
            >
              Remember me
            </label>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center justify-center"
          >
            {loader ? (
              <CircularProgress
                className="animate-spin"
                size={24}
                color="inherit"
              />
            ) : (
              "Register"
            )}
          </button>
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm sm:text-base text-gray-600">
              Already have an account?
            </span>
            <Link
              to="/Adminlogin"
              className="text-sm sm:text-base text-indigo-600 hover:text-indigo-800"
            >
              Log in
            </Link>
          </div>
        </form>
        <Popup
          message={message}
          setShowPopup={setShowPopup}
          showPopup={showPopup}
        />
      </div>
    </div>
  );
};

export default AdminRegisterPage;

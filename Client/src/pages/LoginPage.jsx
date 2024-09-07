import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import bgpic from "../assets/login.jpg";
import { loginUser } from "../redux/userRelated/userHandle";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = ({ role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, currentUser, response, error, currentRole } = useSelector(
    (state) => state.user
  );

  const [toggle, setToggle] = useState(false);
  const [guestLoader, setGuestLoader] = useState(false);
  const [loader, setLoader] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [rollNumberError, setRollNumberError] = useState(false);
  const [studentNameError, setStudentNameError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (role === "Student") {
      const rollNum = event.target.rollNumber.value;
      const studentName = event.target.studentName.value;
      const password = event.target.password.value;

      if (!rollNum || !studentName || !password) {
        if (!rollNum) setRollNumberError(true);
        if (!studentName) setStudentNameError(true);
        if (!password) setPasswordError(true);
        return;
      }
      const fields = { rollNum, studentName, password };
      setLoader(true);
      dispatch(loginUser(fields, role));
    } else {
      const email = event.target.email.value;
      const password = event.target.password.value;

      if (!email || !password) {
        if (!email) setEmailError(true);
        if (!password) setPasswordError(true);
        return;
      }

      const fields = { email, password };
      setLoader(true);
      dispatch(loginUser(fields, role));
    }
  };

  const handleInputChange = (event) => {
    const { name } = event.target;
    if (name === "email") setEmailError(false);
    if (name === "password") setPasswordError(false);
    if (name === "rollNumber") setRollNumberError(false);
    if (name === "studentName") setStudentNameError(false);
  };

  const guestModeHandler = () => {
    const password = "zxc";

    if (role === "Admin") {
      const email = "yogendra@12";
      const fields = { email, password };
      setGuestLoader(true);
      dispatch(loginUser(fields, role));
    } else if (role === "Student") {
      const rollNum = "1";
      const studentName = "Dipesh Awasthi";
      const fields = { rollNum, studentName, password };
      setGuestLoader(true);
      dispatch(loginUser(fields, role));
    } else if (role === "Teacher") {
      const email = "tony@12";
      const fields = { email, password };
      setGuestLoader(true);
      dispatch(loginUser(fields, role));
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
    } else if (status === "failed") {
      toast.error(response || "Login failed");
      setLoader(false);
    } else if (status === "error") {
      toast.error("Network Error");
      setLoader(false);
      setGuestLoader(false);
    }
  }, [status, currentRole, navigate, error, response, currentUser]);

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
        <div className="relative z-10">
          <h1 className="text-4xl mb-4 text-gray-800 font-bold text-center">
            {role} Login
          </h1>
          <p className="text-lg mb-6 text-center">
            Welcome back! Please enter your details
          </p>
          <form onSubmit={handleSubmit} className="w-full">
            {role === "Student" ? (
              <>
                <div className="mb-4">
                  <label
                    htmlFor="rollNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Enter your Roll Number
                  </label>
                  <input
                    id="rollNumber"
                    name="rollNumber"
                    type="number"
                    className={`mt-1 block w-full border rounded-md p-2 ${
                      rollNumberError ? "border-red-500" : "border-gray-300"
                    }`}
                    autoComplete="off"
                    onChange={handleInputChange}
                  />
                  {rollNumberError && (
                    <p className="text-red-500 text-xs mt-1">
                      Roll Number is required
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="studentName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Enter your name
                  </label>
                  <input
                    id="studentName"
                    name="studentName"
                    type="text"
                    className={`mt-1 block w-full border rounded-md p-2 ${
                      studentNameError ? "border-red-500" : "border-gray-300"
                    }`}
                    autoComplete="name"
                    onChange={handleInputChange}
                  />
                  {studentNameError && (
                    <p className="text-red-500 text-xs mt-1">
                      Name is required
                    </p>
                  )}
                </div>
              </>
            ) : (
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Enter your email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={`mt-1 block w-full border rounded-md p-2 ${
                    emailError ? "border-red-500" : "border-gray-300"
                  }`}
                  autoComplete="email"
                  onChange={handleInputChange}
                />
                {emailError && (
                  <p className="text-red-500 text-xs mt-1">Email is required</p>
                )}
              </div>
            )}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={toggle ? "text" : "password"}
                  className={`mt-1 block w-full border rounded-md p-2 ${
                    passwordError ? "border-red-500" : "border-gray-300"
                  }`}
                  autoComplete="current-password"
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-2"
                  onClick={() => setToggle(!toggle)}
                >
                  {toggle ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {passwordError && (
                <p className="text-red-500 text-xs mt-1">
                  Password is required
                </p>
              )}
            </div>
            <div className="flex justify-between items-center mb-4">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2 text-sm text-gray-700">Remember me</span>
              </label>
              {/* <Link to="#" className="text-indigo-600 text-sm">
                Forgot password?
              </Link> */}
            </div>
            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-md text-white font-semibold bg-gradient-to-r from-black via-gray-700 to-gray-600 transition-all duration-300 ease-in-out transform hover:from-gray-700 hover:to-black hover:outline hover:outline-white hover:outline-2 hover:outline-offset-2 focus:outline-none`}
              disabled={loader}
            >
              {loader ? "Logging in..." : "Login"}
            </button>
            <button
              type="button"
              className="w-full bg-gray-200 text-gray-800 py-2 mt-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              onClick={guestModeHandler}
              disabled={guestLoader}
            >
              {guestLoader ? "Loading..." : "Guest Login"}
            </button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

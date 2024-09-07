import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSubjectDetails } from "../../../redux/sclassRelated/sclassHandle";
import { registerUser } from "../../../redux/userRelated/userHandle";
import { underControl } from "../../../redux/userRelated/userSlice";
import CircularProgress from "../../../components/CircularProgress"; // Custom CircularProgress Component
import Popup from "../../../components/Popup";

const AddTeacher = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subjectID = params.id;

  const { status, response, error } = useSelector((state) => state.user);
  const { subjectDetails } = useSelector((state) => state.sclass);

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, "Subject"));
  }, [dispatch, subjectID]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  const role = "Teacher";
  const school = subjectDetails?.school;
  const teachSubject = subjectDetails?._id;
  const teachSclass = subjectDetails?.sclassName?._id;

  const fields = {
    name,
    email,
    password,
    role,
    school,
    teachSubject,
    teachSclass,
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(registerUser(fields, role));
  };

  useEffect(() => {
    if (status === "added") {
      dispatch(underControl());
      navigate("/Admin/teachers");
    } else if (status === "failed") {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === "error") {
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, response, dispatch]);

  return (
    <div className="p-4 max-w-md mx-auto mt-4 sm:mt-20 md:mt-20 lg-mt-20">
      <div className="bg-white bg-opacity-75 p-6 rounded-lg shadow-lg">
        <form className="space-y-4" onSubmit={submitHandler}>
          <h2 className="text-xl md:text-2xl lg:text-2xl font-bold text-center">
            Add Teacher
          </h2>
          <div className="flex space-x-4 mb-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium">Subject</label>
              <p className="text-gray-700">{subjectDetails?.subName}</p>
            </div>
            <div className="flex flex-col justify-end">
              <label className="text-sm font-medium ">Class</label>
              <p className="text-gray-700">
                {subjectDetails?.sclassName?.sclassName}
              </p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              placeholder="Enter teacher's name..."
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter teacher's email..."
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter teacher's password..."
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            disabled={loader}
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {loader ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Register"
            )}
          </button>
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

export default AddTeacher;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../redux/userRelated/userHandle";
import Popup from "../../../components/Popup";
import { underControl } from "../../../redux/userRelated/userSlice";
import { getAllSclasses } from "../../../redux/sclassRelated/sclassHandle";
import { FaSpinner } from "react-icons/fa"; // Replacing CircularProgress with a Tailwind-compatible spinner

const AddStudent = ({ situation }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const userState = useSelector((state) => state.user);
  const { status, currentUser, response, error } = userState;
  const { sclassesList } = useSelector((state) => state.sclass);

  const [name, setName] = useState("");
  const [rollNum, setRollNum] = useState("");
  const [password, setPassword] = useState("");
  const [className, setClassName] = useState("");
  const [sclassName, setSclassName] = useState("");

  const adminID = currentUser._id;
  const role = "Student";
  const attendance = [];

  useEffect(() => {
    if (situation === "Class") {
      setSclassName(params.id);
    }
  }, [params.id, situation]);

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    dispatch(getAllSclasses(adminID, "Sclass"));
  }, [adminID, dispatch]);

  const changeHandler = (event) => {
    if (event.target.value === "Select Class") {
      setClassName("Select Class");
      setSclassName("");
    } else {
      const selectedClass = sclassesList.find(
        (classItem) => classItem.sclassName === event.target.value
      );
      setClassName(selectedClass.sclassName);
      setSclassName(selectedClass._id);
    }
  };

  const fields = {
    name,
    rollNum,
    password,
    sclassName,
    adminID,
    role,
    attendance,
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (sclassName === "") {
      setMessage("Please select a classname");
      setShowPopup(true);
    } else {
      setLoader(true);
      dispatch(registerUser(fields, role));
    }
  };

  useEffect(() => {
    if (status === "added") {
      dispatch(underControl());
      navigate(-1);
    } else if (status === "failed") {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === "error") {
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, error, response, dispatch]);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen py-6 px-4">
        <div className="w-full max-w-md bg-stone-300 shadow-md rounded-lg p-6 border border-gray-200">
          <form className="space-y-4" onSubmit={submitHandler}>
            <h2 className="text-2xl font-bold mb-4">Add Student</h2>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              className="w-full p-2 border border-[#156d15] rounded-lg"
              type="text"
              placeholder="Enter student's name..."
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              required
            />

            {situation === "Student" && (
              <>
                <label className="block text-sm font-medium text-gray-700">
                  Class
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={className}
                  onChange={changeHandler}
                  required
                >
                  <option value="Select Class">Select Class</option>
                  {sclassesList.map((classItem, index) => (
                    <option key={index} value={classItem.sclassName}>
                      {classItem.sclassName}
                    </option>
                  ))}
                </select>
              </>
            )}

            <label className="block text-sm font-medium text-gray-700">
              Roll Number
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-lg"
              type="number"
              placeholder="Enter student's Roll Number..."
              value={rollNum}
              onChange={(event) => setRollNum(event.target.value)}
              required
            />

            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-lg"
              type="password"
              placeholder="Enter student's password..."
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
              required
            />

            <button
              className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              type="submit"
              disabled={loader}
            >
              {loader ? <FaSpinner className="animate-spin mx-auto" /> : "Add"}
            </button>
          </form>
        </div>
      </div>
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </>
  );
};

export default AddStudent;

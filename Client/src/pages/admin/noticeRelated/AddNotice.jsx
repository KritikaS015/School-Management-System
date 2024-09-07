import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addStuff } from "../../../redux/userRelated/userHandle";
import { underControl } from "../../../redux/userRelated/userSlice";
import Popup from "../../../components/Popup";

const AddNotice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, response, error } = useSelector((state) => state.user);
  const { currentUser } = useSelector((state) => state.user);

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [date, setDate] = useState("");
  const adminID = currentUser._id;

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const fields = { title, details, date, adminID };
  const address = "Notice";

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(addStuff(fields, address));
  };

  useEffect(() => {
    if (status === "added") {
      navigate("/Admin/notices");
      dispatch(underControl());
    } else if (status === "error") {
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, error, response, dispatch]);

  return (
    <>
      <div className="register p-4 bg-gray-100 rounded-lg shadow-md max-w-lg mx-auto">
        <form className="registerForm" onSubmit={submitHandler}>
          <span className="registerTitle text-2xl font-bold mb-4 block text-center">
            Add Notice
          </span>

          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            className="registerInput mt-1 p-2 w-full border border-gray-300 rounded-md"
            type="text"
            placeholder="Enter notice title..."
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />

          <label className="block text-sm font-medium text-gray-700 mt-4">
            Details
          </label>
          <input
            className="registerInput mt-1 p-2 w-full border border-gray-300 rounded-md"
            type="text"
            placeholder="Enter notice details..."
            value={details}
            onChange={(event) => setDetails(event.target.value)}
            required
          />

          <label className="block text-sm font-medium text-gray-700 mt-4">
            Date
          </label>
          <input
            className="registerInput mt-1 p-2 w-full border border-gray-300 rounded-md"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />

          <button
            className={`registerButton mt-6 w-full p-2 rounded-md text-white font-bold ${
              loader ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
            }`}
            type="submit"
            disabled={loader}
          >
            {loader ? (
              <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 border-t-2 border-white rounded-full"></div>
            ) : (
              "Add"
            )}
          </button>
        </form>
      </div>
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </>
  );
};

export default AddNotice;

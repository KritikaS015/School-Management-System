import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addStuff } from "../../../redux/userRelated/userHandle";
import { underControl } from "../../../redux/userRelated/userSlice";
import Popup from "../../../components/Popup";
import Classroom from "../../../assets/img8.webp";
import { FaArrowLeft } from "react-icons/fa";
import { IoMdCreate } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const AddClass = () => {
  const [sclassName, setSclassName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userState = useSelector((state) => state.user);
  const { status, currentUser, response, error, tempDetails } = userState;

  const adminID = currentUser._id;
  const address = "Sclass";

  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const fields = {
    sclassName,
    adminID,
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(addStuff(fields, address));
  };

  useEffect(() => {
    if (status === "added" && tempDetails) {
      navigate("/Admin/classes/class/" + tempDetails._id);
      dispatch(underControl());
      setLoader(false);
    } else if (status === "failed") {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === "error") {
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, error, response, dispatch, tempDetails]);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg border border-gray-300">
          <div className="flex justify-center mb-6">
            <img src={Classroom} alt="classroom" className="w-3/5" />
          </div>
          <form onSubmit={submitHandler}>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="sclassName"
                  className="block text-sm p-2 font-medium text-gray-700"
                >
                  Create a class
                </label>
                <input
                  id="sclassName"
                  type="text"
                  value={sclassName}
                  onChange={(event) => setSclassName(event.target.value)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 flex items-center justify-center bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={loader}
              >
                {loader ? (
                  <AiOutlineLoading3Quarters className="animate-spin mr-2" />
                ) : (
                  <>
                    <IoMdCreate className="mr-2" />
                    Create
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-full py-2 px-4 flex items-center justify-center border border-gray-300 text-gray-700 font-semibold rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <FaArrowLeft className="mr-2" />
                Go Back
              </button>
            </div>
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

export default AddClass;

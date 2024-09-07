import { useDispatch } from "react-redux";
import { underControl } from "../redux/userRelated/userSlice";
import { underStudentControl } from "../redux/studentRelated/studentSlice";
import { useEffect } from "react";

const Popup = ({ message, setShowPopup, showPopup }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    setShowPopup(false);
    dispatch(underControl());
    dispatch(underStudentControl());
  };

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        handleClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  return (
    <>
      {showPopup && (
        <div className="fixed top-4 right-4 z-50">
          <div
            className={`p-4 mb-4 rounded-lg shadow-lg ${
              message === "Done Successfully"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            <div className="flex justify-between items-center">
              <span>{message}</span>
              <button
                onClick={handleClose}
                className="ml-4 text-lg font-semibold hover:text-gray-200"
              >
                &times;
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;

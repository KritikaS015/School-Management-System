import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Popup from "../../components/Popup";
import { addStuff } from "../../redux/userRelated/userHandle";

const StudentComplain = () => {
  const [complaint, setComplaint] = useState("");
  const [date, setDate] = useState("");

  const dispatch = useDispatch();
  const { status, currentUser, error } = useSelector((state) => state.user);

  const user = currentUser._id;
  const school = currentUser.school._id;
  const address = "Complain";

  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const fields = {
    user,
    date,
    complaint,
    school,
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(addStuff(fields, address));
  };

  useEffect(() => {
    if (status === "added") {
      setLoader(false);
      setShowPopup(true);
      setMessage("Done Successfully");
    } else if (error) {
      setLoader(false);
      setShowPopup(true);
      setMessage("Network Error");
    }
  }, [status, error]);

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-100 bg-opacity-50">
        <div className="max-w-lg w-full bg-black bg-opacity-20 border border-gray-300 rounded-lg shadow-lg px-6 py-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Complain
          </h2>
          <form onSubmit={submitHandler}>
            <div className="space-y-6">
              <div>
                <label
                  className="block text-gray-700 text-sm font-medium mb-1"
                  htmlFor="date"
                >
                  Select Date
                </label>
                <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-medium mb-1"
                  htmlFor="complaint"
                >
                  Write your complain
                </label>
                <textarea
                  id="complaint"
                  value={complaint}
                  onChange={(event) => setComplaint(event.target.value)}
                  required
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                disabled={loader}
                className="mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loader ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      viewBox="0 0 24 24"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M4 12c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8-8 3.6-8 8zm2-7h4v2H6V5zm4 16c-4.4 0-8-3.6-8-8h2c0 3.3 2.7 6 6 6s6-2.7 6-6h2c0 4.4-3.6 8-8 8zm4-6h4v2h-4v-2z" />
                    </svg>
                  </span>
                ) : (
                  "Add"
                )}
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

export default StudentComplain;

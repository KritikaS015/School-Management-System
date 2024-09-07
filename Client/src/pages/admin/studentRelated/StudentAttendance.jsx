import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserDetails } from "../../../redux/userRelated/userHandle";
import { getSubjectList } from "../../../redux/sclassRelated/sclassHandle";
import { updateStudentFields } from "../../../redux/studentRelated/studentHandle";

import Popup from "../../../components/Popup";

const StudentAttendance = ({ situation }) => {
  const dispatch = useDispatch();
  const { currentUser, userDetails, loading } = useSelector(
    (state) => state.user
  );
  const { subjectsList } = useSelector((state) => state.sclass);
  const { response, error, statestatus } = useSelector(
    (state) => state.student
  );
  const params = useParams();

  const [studentID, setStudentID] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [chosenSubName, setChosenSubName] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (situation === "Student") {
      setStudentID(params.id);
      dispatch(getUserDetails(params.id, "Student"));
    } else if (situation === "Subject") {
      const { studentID, subjectID } = params;
      setStudentID(studentID);
      dispatch(getUserDetails(studentID, "Student"));
      setChosenSubName(subjectID);
    }
  }, [situation]);

  useEffect(() => {
    if (userDetails && userDetails.sclassName && situation === "Student") {
      dispatch(getSubjectList(userDetails.sclassName._id, "ClassSubjects"));
    }
  }, [dispatch, userDetails]);

  const changeHandler = (event) => {
    const selectedSubject = subjectsList.find(
      (subject) => subject.subName === event.target.value
    );
    setSubjectName(selectedSubject.subName);
    setChosenSubName(selectedSubject._id);
  };

  const fields = { subName: chosenSubName, status, date };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(updateStudentFields(studentID, fields, "StudentAttendance"));
    // Clear form fields after submitting
    setSubjectName("");
    setChosenSubName("");
    setStatus("");
    setDate("");
  };

  useEffect(() => {
    if (response) {
      setLoader(false);
      setShowPopup(true);
      setMessage(response);
    } else if (error) {
      setLoader(false);
      setShowPopup(true);
      setMessage("Error occurred");
    } else if (statestatus === "added") {
      setLoader(false);
      setShowPopup(true);
      setMessage("Done Successfully");
    }
  }, [response, statestatus, error]);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="text-lg font-semibold">Loading...</div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <div className="max-w-md w-full p-6 bg-white shadow-md rounded-lg">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">
                Student Name: {userDetails.name}
              </h2>
              {currentUser.teachSubject && (
                <p className="text-lg mb-4">
                  Subject Name: {currentUser.teachSubject.subName}
                </p>
              )}
            </div>
            <form onSubmit={submitHandler} className="space-y-4">
              {situation === "Student" && (
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Select Subject
                  </label>
                  <select
                    id="subject"
                    className="block w-full border border-gray-300 rounded-md p-2"
                    value={subjectName}
                    onChange={changeHandler}
                    required
                  >
                    <option value="">Select Subject</option>
                    {subjectsList.length > 0 ? (
                      subjectsList.map((subject, index) => (
                        <option key={index} value={subject.subName}>
                          {subject.subName}
                        </option>
                      ))
                    ) : (
                      <option value="">Add Subjects For Attendance</option>
                    )}
                  </select>
                </div>
              )}
              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Attendance Status
                </label>
                <select
                  id="status"
                  className="block w-full border border-gray-300 rounded-md p-2"
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                  required
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Select Date
                </label>
                <input
                  type="date"
                  id="date"
                  className="block w-full border border-gray-300 rounded-md p-2"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className={`w-full px-4 py-2 rounded-md text-white ${
                  loader ? "bg-gray-400" : "bg-purple-500 hover:bg-purple-600"
                } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                disabled={loader}
              >
                {loader ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </>
  );
};

export default StudentAttendance;

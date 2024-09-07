import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addStuff } from "../../../redux/userRelated/userHandle";
import { underControl } from "../../../redux/userRelated/userSlice";
import Popup from "../../../components/Popup";
import {
  BlueButton,
  RedButton,
  GreenButton,
} from "../../../components/ButtonStyles";
import TextField from "../../../components/TextField"; // Custom TextField Component
import CircularProgress from "../../../components/CircularProgress"; // Custom CircularProgress Component

const SubjectForm = () => {
  const [subjects, setSubjects] = useState([
    { subName: "", subCode: "", sessions: "" },
  ]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { status, currentUser, response, error } = useSelector(
    (state) => state.user
  );
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  const sclassName = params.id;
  const adminID = currentUser._id;
  const address = "Subject";

  const handleSubjectNameChange = (index) => (event) => {
    const newSubjects = [...subjects];
    newSubjects[index].subName = event.target.value;
    setSubjects(newSubjects);
  };

  const handleSubjectCodeChange = (index) => (event) => {
    const newSubjects = [...subjects];
    newSubjects[index].subCode = event.target.value;
    setSubjects(newSubjects);
  };

  const handleSessionsChange = (index) => (event) => {
    const newSubjects = [...subjects];
    newSubjects[index].sessions = event.target.value || 0;
    setSubjects(newSubjects);
  };

  const handleAddSubject = () => {
    setSubjects([...subjects, { subName: "", subCode: "", sessions: "" }]);
  };

  const handleRemoveSubject = (index) => () => {
    const newSubjects = [...subjects];
    newSubjects.splice(index, 1);
    setSubjects(newSubjects);
  };

  const fields = {
    sclassName,
    subjects: subjects.map((subject) => ({
      subName: subject.subName,
      subCode: subject.subCode,
      sessions: subject.sessions,
    })),
    adminID,
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(addStuff(fields, address));
  };

  useEffect(() => {
    if (status === "added") {
      navigate("/Admin/subjects");
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
  }, [status, navigate, error, response, dispatch]);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white border border-gray-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add Subjects</h2>
      <form onSubmit={submitHandler}>
        <div className="space-y-4">
          {subjects.map((subject, index) => (
            <div key={index} className="flex flex-wrap space-x-4 mb-4">
              <div className="flex-1">
                <TextField
                  label="Subject Name"
                  value={subject.subName}
                  onChange={handleSubjectNameChange(index)}
                  required
                />
              </div>
              <div className="flex-1">
                <TextField
                  label="Subject Code"
                  value={subject.subCode}
                  onChange={handleSubjectCodeChange(index)}
                  required
                />
              </div>
              <div className="flex-1">
                <TextField
                  label="Sessions"
                  type="number"
                  value={subject.sessions}
                  onChange={handleSessionsChange(index)}
                  required
                />
              </div>
              <div className="flex items-end">
                {index === 0 ? (
                  <BlueButton onClick={handleAddSubject}>
                    Add Subject
                  </BlueButton>
                ) : (
                  <RedButton onClick={handleRemoveSubject(index)}>
                    Remove
                  </RedButton>
                )}
              </div>
            </div>
          ))}
          <div className="flex justify-center">
            <GreenButton type="submit" disabled={loader}>
              {loader ? <CircularProgress /> : "Save"}
            </GreenButton>
          </div>
        </div>
      </form>
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </div>
  );
};

export default SubjectForm;

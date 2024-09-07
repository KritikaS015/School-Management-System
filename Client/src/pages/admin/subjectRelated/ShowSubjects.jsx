import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSubjectList } from "../../../redux/sclassRelated/sclassHandle";
import { deleteUser } from "../../../redux/userRelated/userHandle";
import { BlueButton, GreenButton } from "../../../components/ButtonStyles";
import TableTemplate from "../../../components/TableTemplate";
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import Popup from "../../../components/Popup";
import { HiPlus, HiTrash } from "react-icons/hi";
import { FaEye } from "react-icons/fa";

const ShowSubjects = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { subjectsList, loading, error, response } = useSelector(
    (state) => state.sclass
  );
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getSubjectList(currentUser._id, "AllSubjects"));
  }, [currentUser._id, dispatch]);

  if (error) {
    console.log(error);
  }

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const deleteHandler = (deleteID, address) => {
    // console.log(deleteID);
    // console.log(address);
    // setMessage("Sorry the delete function has been disabled for now.");
    // setShowPopup(true);

    dispatch(deleteUser(deleteID, address)).then(() => {
      dispatch(getSubjectList(currentUser._id, "AllSubjects"));
    });
  };

  const subjectColumns = [
    { id: "subName", label: "Sub Name", minWidth: "w-1/4" },
    { id: "sessions", label: "Sessions", minWidth: "w-1/4" },
    { id: "sclassName", label: "Class", minWidth: "w-1/4" },
  ];

  const subjectRows = subjectsList.map((subject) => ({
    subName: subject.subName,
    sessions: subject.sessions,
    sclassName: subject.sclassName.sclassName,
    sclassID: subject.sclassName._id,
    id: subject._id,
  }));

  const SubjectsButtonHaver = ({ row }) => (
    <div className="flex space-x-4">
      <button
        onClick={() => deleteHandler(row.id, "Subject")}
        className="text-red-500 hover:text-red-700"
      >
        <HiTrash className="w-6 h-6" />
      </button>
      <BlueButton
        onClick={() =>
          navigate(`/Admin/subjects/subject/${row.sclassID}/${row.id}`)
        }
      >
        <FaEye className="w-5 h-5" />
      </BlueButton>
    </div>
  );

  const actions = [
    {
      icon: <HiPlus className="w-6 h-6" />,
      name: "Add New Subject",
      action: () => navigate("/Admin/subjects/chooseclass"),
    },
    {
      icon: <HiTrash className="w-6 h-6 text-red-500" />,
      name: "Delete All Subjects",
      action: () => deleteHandler(currentUser._id, "Subjects"),
    },
  ];

  return (
    <div className="p-4">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {response ? (
            <div className="flex justify-end mt-4">
              <GreenButton
                onClick={() => navigate("/Admin/subjects/chooseclass")}
              >
                Add Subjects
              </GreenButton>
            </div>
          ) : (
            <div className="overflow-x-auto">
              {Array.isArray(subjectsList) && subjectsList.length > 0 && (
                <TableTemplate
                  buttonHaver={SubjectsButtonHaver}
                  columns={subjectColumns}
                  rows={subjectRows}
                />
              )}
              <SpeedDialTemplate actions={actions} />
            </div>
          )}
        </>
      )}
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </div>
  );
};

export default ShowSubjects;

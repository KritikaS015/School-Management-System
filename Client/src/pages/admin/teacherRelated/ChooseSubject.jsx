import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllTeachers } from "../../../redux/teacherRelated/teacherHandle";
import { deleteUser } from "../../../redux/userRelated/userHandle";
import { GreenButton, BlueButton } from "../../../components/ButtonStyles";
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import Popup from "../../../components/Popup";
import { FaUserPlus, FaUserMinus } from "react-icons/fa";
import TableTemplate from "../../../components/TableTemplate"; // Import the TableTemplate component

const ShowTeachers = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { teachersList, loading, error, response } = useSelector(
    (state) => state.teacher
  );
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllTeachers(currentUser._id));
  }, [currentUser._id, dispatch]);

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  if (loading) {
    return <div className="text-center text-gray-700">Loading...</div>;
  } else if (response) {
    return (
      <div className="flex justify-end mt-4">
        <GreenButton onClick={() => navigate("/Admin/teachers/chooseclass")}>
          Add Teacher
        </GreenButton>
      </div>
    );
  } else if (error) {
    console.log(error);
  }

  const deleteHandler = (deleteID, address) => {
    console.log(deleteID);
    console.log(address);
    setMessage("Sorry, the delete function has been disabled for now.");
    setShowPopup(true);

    // dispatch(deleteUser(deleteID, address)).then(() => {
    //     dispatch(getAllTeachers(currentUser._id));
    // });
  };

  const columns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "teachSubject", label: "Subject", minWidth: 100 },
    { id: "teachSclass", label: "Class", minWidth: 170 },
  ];

  const rows = teachersList.map((teacher) => {
    return {
      name: teacher.name,
      teachSubject: teacher.teachSubject?.subName || null,
      teachSclass: teacher.teachSclass.sclassName,
      teachSclassID: teacher.teachSclass._id,
      id: teacher._id,
    };
  });

  const actions = [
    {
      icon: <FaUserPlus className="text-blue-500 text-2xl" />,
      name: "Add New Teacher",
      action: () => navigate("/Admin/teachers/chooseclass"),
    },
    {
      icon: <FaUserMinus className="text-red-500 text-2xl" />,
      name: "Delete All Teachers",
      action: () => deleteHandler(currentUser._id, "Teachers"),
    },
  ];

  const ButtonHaver = ({ row }) => (
    <>
      <button
        onClick={() => deleteHandler(row.id, "Teacher")}
        className="text-red-500 hover:text-red-700"
      >
        <FaUserMinus className="text-xl" />
      </button>
      <BlueButton onClick={() => navigate("/Admin/teachers/teacher/" + row.id)}>
        View
      </BlueButton>
    </>
  );

  return (
    <div className="p-4">
      <TableTemplate buttonHaver={ButtonHaver} columns={columns} rows={rows} />
      <SpeedDialTemplate actions={actions} />
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </div>
  );
};

export default ShowTeachers;

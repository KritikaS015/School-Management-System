import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../../redux/userRelated/userHandle";
import { getAllSclasses } from "../../../redux/sclassRelated/sclassHandle";
import TableTemplate from "../../../components/TableTemplate";
import Popup from "../../../components/Popup";
import { FaPlus, FaTrashAlt, FaUserPlus, FaBook } from "react-icons/fa";
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";

const ShowClasses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sclassesList, loading, error, getresponse } = useSelector(
    (state) => state.sclass
  );
  const { currentUser } = useSelector((state) => state.user);
  const adminID = currentUser._id;

  useEffect(() => {
    dispatch(getAllSclasses(adminID, "Sclass"));
  }, [adminID, dispatch]);

  if (error) {
    console.log(error);
  }

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const deleteHandler = (deleteID, address) => {
    dispatch(deleteUser(deleteID, address)).then(() => {
      dispatch(getAllSclasses(adminID, "Sclass"));
    });
  };

  const sclassColumns = [{ id: "name", label: "Class Name", minWidth: 170 }];

  const sclassRows =
    sclassesList &&
    sclassesList.length > 0 &&
    sclassesList.map((sclass) => ({
      name: sclass.sclassName,
      id: sclass._id,
    }));

  const SclassButtonHaver = ({ row }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    return (
      <div className="relative flex items-center gap-2 ">
        <button
          onClick={() => deleteHandler(row.id, "Sclass")}
          className="bg-red-500 text-white p-2 sm:p-3 md:p-4 lg-p-4 rounded-lg shadow-lg hover:bg-red-600 transition md:mr-auto lg:mr-auto "
        >
          <FaTrashAlt />
        </button>
        <button
          onClick={() => navigate("/Admin/classes/class/" + row.id)}
          className="bg-blue-500 text-white p-2 md:w-20 lg:w-20 rounded-lg shadow-lg hover:bg-blue-600 transition md:mr-auto lg:mr-auto"
        >
          View
        </button>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="bg-gray-500 text-white p-2 md:w-20 lg:w-20 rounded-lg shadow-lg hover:bg-gray-600 transition md:mr-auto lg:mr-auto"
          >
            More
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <button
                onClick={() => navigate("/Admin/addsubject/" + row.id)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FaBook className="inline-block mr-2" />
                Add Subjects
              </button>
              <button
                onClick={() => navigate("/Admin/class/addstudents/" + row.id)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FaUserPlus className="inline-block mr-2" />
                Add Student
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const actions = [
    {
      icon: <FaPlus />,
      name: "Add New Class",
      action: () => navigate("/Admin/addclass"),
    },
    {
      icon: <FaTrashAlt />,
      name: "Delete All Classes",
      action: () => deleteHandler(adminID, "Sclasses"),
    },
  ];

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {getresponse ? (
            <div className="flex justify-end mt-4">
              {/* <button
                onClick={() => navigate("/Admin/addclass")}
                className="bg-green-500 text-white p-2 rounded-lg shadow-lg hover:bg-green-600 transition"
              >
                Add Class
              </button> */}
            </div>
          ) : (
            <>
              {Array.isArray(sclassesList) && sclassesList.length > 0 && (
                <TableTemplate
                  buttonHaver={SclassButtonHaver}
                  columns={sclassColumns}
                  rows={sclassRows}
                />
              )}
              <SpeedDialTemplate actions={actions} />
            </>
          )}
        </>
      )}
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </>
  );
};

export default ShowClasses;

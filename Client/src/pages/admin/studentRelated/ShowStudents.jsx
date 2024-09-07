import React, { useEffect, useState, useRef, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllStudents } from "../../../redux/studentRelated/studentHandle";
import { deleteUser } from "../../../redux/userRelated/userHandle";
import TableTemplate from "../../../components/TableTemplate";
import Popup from "../../../components/Popup";
import {
  BlueButton,
  GreenButton,
  BlackButton,
} from "../../../components/ButtonStyles";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { UserRemoveIcon, UserAddIcon } from "@heroicons/react/solid";

const ShowStudents = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { studentsList, loading, error, response } = useSelector(
    (state) => state.student
  );
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllStudents(currentUser._id));
  }, [currentUser._id, dispatch]);

  if (error) {
    console.log(error);
  }

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const deleteHandler = (deleteID) => {
    console.log(deleteID);
    // setMessage("Sorry, the delete function has been disabled for now.");
    // setShowPopup(true);

    // Uncomment the following code when ready to enable delete functionality
    dispatch(deleteUser(deleteID)).then(() => {
      dispatch(getAllStudents(currentUser._id));
    });
  };

  const studentColumns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "rollNum", label: "Roll Number", minWidth: 100 },
    { id: "sclassName", label: "Class", minWidth: 170 },
  ];

  const studentRows =
    studentsList &&
    studentsList.length > 0 &&
    studentsList.map((student) => {
      return {
        name: student.name,
        rollNum: student.rollNum,
        sclassName: student.sclassName.sclassName,
        id: student._id,
      };
    });

  const StudentButtonHaver = ({ row }) => {
    const options = ["Take Attendance", "Provide Marks"];
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleClick = () => {
      if (selectedIndex === 0) {
        handleAttendance();
      } else if (selectedIndex === 1) {
        handleMarks();
      }
    };

    const handleAttendance = () => {
      navigate("/Admin/students/student/attendance/" + row.id);
    };

    const handleMarks = () => {
      navigate("/Admin/students/student/marks/" + row.id);
    };

    const handleMenuItemClick = (event, index) => {
      setSelectedIndex(index);
      setOpen(false);
    };

    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
      setOpen(false);
    };

    return (
      <>
        <button
          onClick={() => deleteHandler(row.id)}
          className="text-red-600 p-2"
        >
          <UserRemoveIcon className="h-6 w-6" />
        </button>
        <BlueButton
          onClick={() => navigate("/Admin/students/student/" + row.id)}
        >
          View
        </BlueButton>
        <Fragment>
          <div className="relative inline-block text-left" ref={anchorRef}>
            <div>
              <div className="inline-flex rounded-md shadow-sm">
                <button
                  onClick={handleClick}
                  className="inline-flex justify-center w-full rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {options[selectedIndex]}
                </button>
                <BlackButton
                  onClick={handleToggle}
                  className="inline-flex items-center px-2 rounded-r-md border border-l-0 border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                >
                  {open ? (
                    <ChevronUpIcon className="h-5 w-5" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5" />
                  )}
                </BlackButton>
              </div>
            </div>

            {open && (
              <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  {options.map((option, index) => (
                    <button
                      key={option}
                      onClick={(event) => handleMenuItemClick(event, index)}
                      className={`block px-4 py-2 text-sm text-gray-700 w-full text-left ${
                        index === selectedIndex ? "bg-gray-100" : ""
                      }`}
                      role="menuitem"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Fragment>
      </>
    );
  };

  const actions = [
    {
      icon: <UserAddIcon className="h-6 w-6 text-blue-600" />,
      name: "Add New Student",
      action: () => navigate("/Admin/addstudents"),
    },
    {
      icon: <UserRemoveIcon className="h-6 w-6 text-red-600" />,
      name: "Delete All Students",
      action: () => deleteHandler(currentUser._id),
    },
  ];

  return (
    <>
      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : (
        <>
          {response ? (
            <div className="flex justify-end mt-4">
              <GreenButton onClick={() => navigate("/Admin/addstudents")}>
                Add Students
              </GreenButton>
            </div>
          ) : (
            <div className="w-full overflow-hidden">
              {Array.isArray(studentsList) && studentsList.length > 0 && (
                <TableTemplate
                  buttonHaver={StudentButtonHaver}
                  columns={studentColumns}
                  rows={studentRows}
                />
              )}
              <div className="fixed bottom-10 right-10 flex space-x-4">
                {actions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className="p-3 rounded-full shadow-lg"
                  >
                    {action.icon}
                  </button>
                ))}
              </div>
            </div>
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

export default ShowStudents;

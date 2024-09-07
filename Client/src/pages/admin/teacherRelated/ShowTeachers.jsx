import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllTeachers } from "../../../redux/teacherRelated/teacherHandle";
import { deleteUser } from "../../../redux/userRelated/userHandle";
import { GreenButton, BlueButton } from "../../../components/ButtonStyles";
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import Popup from "../../../components/Popup";
import { FaUserPlus, FaUserMinus } from "react-icons/fa"; // Using react-icons for alternatives

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
    // console.log(deleteID);
    // console.log(address);
    // setMessage("Sorry, the delete function has been disabled for now.");
    // setShowPopup(true);

    dispatch(deleteUser(deleteID, address)).then(() => {
      dispatch(getAllTeachers(currentUser._id));
    });
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

  return (
    <div className="p-4">
      <div className="max-h-60 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200  ">
          <thead className="bg-[#06113C] text-white ">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.id}
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </th>
              ))}
              <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-[#D1E9F6] divide-y divide-gray-300">
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <tr key={row.id} className="hover:bg-gray-100">
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (column.id === "teachSubject") {
                        return (
                          <td key={column.id} className="px-6 py-4 text-center">
                            {value ? (
                              value
                            ) : (
                              <GreenButton
                                onClick={() =>
                                  navigate(
                                    `/Admin/teachers/choosesubject/${row.teachSclassID}/${row.id}`
                                  )
                                }
                              >
                                Add Subject
                              </GreenButton>
                            )}
                          </td>
                        );
                      }
                      return (
                        <td key={column.id} className="px-6 py-4">
                          {value}
                        </td>
                      );
                    })}
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => deleteHandler(row.id, "Teacher")}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaUserMinus className="text-xl mr-2" />
                      </button>
                      <BlueButton
                        onClick={() =>
                          navigate("/Admin/teachers/teacher/" + row.id)
                        }
                      >
                        View
                      </BlueButton>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4 p-2 bg-[#55679C]">
        <div className="flex items-center">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            className="px-1 sm:px-4 md:px-4 lg:px-4 py-2 bg-[#06113C] text-white rounded hover:bg-gray-200 hover:text-black"
          >
            Previous
          </button>
          <span className="mx-2 text-white">
            Page {page + 1} of {Math.ceil(rows.length / rowsPerPage)}
          </span>
          <button
            onClick={() =>
              setPage((prev) =>
                Math.min(prev + 1, Math.ceil(rows.length / rowsPerPage) - 1)
              )
            }
            className="px-1 sm:px-4 md:px-4 lg:px-4 py-2 bg-[#06113C] text-white rounded hover:bg-gray-200 hover:text-black"
          >
            Next
          </button>
        </div>
        <select
          value={rowsPerPage}
          onChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          className="p-2 border rounded-lg"
        >
          {[5, 10, 25, 100].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>

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

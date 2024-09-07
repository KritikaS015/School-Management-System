import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TableTemplate from "../../../components/TableTemplate";
import Popup from "../../../components/Popup"; // Assuming there's a Popup component for confirmation dialogs
import { getAllNotices } from "../../../redux/noticeRelated/noticeHandle";
import { deleteUser } from "../../../redux/userRelated/userHandle";
import { FaPlus, FaTrashAlt } from "react-icons/fa";

const ShowNotices = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { noticesList, loading, error, response } = useSelector(
    (state) => state.notice
  );
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllNotices(currentUser._id, "Notice"));
  }, [currentUser._id, dispatch]);

  if (error) {
    console.log(error);
  }

  const deleteHandler = (deleteID, address) => {
    dispatch(deleteUser(deleteID, address)).then(() => {
      dispatch(getAllNotices(currentUser._id, "Notice"));
    });
  };

  const noticeColumns = [
    { id: "title", label: "Title", minWidth: 170 },
    { id: "details", label: "Details", minWidth: 100 },
    { id: "date", label: "Date", minWidth: 170 },
  ];

  const noticeRows =
    noticesList &&
    noticesList.length > 0 &&
    noticesList.map((notice) => {
      const date = new Date(notice.date);
      const dateString =
        date.toString() !== "Invalid Date"
          ? date.toISOString().substring(0, 10)
          : "Invalid Date";
      return {
        title: notice.title,
        details: notice.details,
        date: dateString,
        id: notice._id,
      };
    });

  const NoticeButtonHaver = ({ row }) => {
    return (
      <>
        <button
          onClick={() => deleteHandler(row.id, "Notice")}
          className="text-red-600 hover:text-red-800 transition"
        >
          <FaTrashAlt />
        </button>
      </>
    );
  };

  const actions = [
    {
      icon: <FaPlus className="text-blue-600" />,
      name: "Add New Notice",
      action: () => navigate("/Admin/addnotice"),
    },
    {
      icon: <FaTrashAlt className="text-red-600" />,
      name: "Delete All Notices",
      action: () => deleteHandler(currentUser._id, "Notices"),
    },
  ];

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {response ? (
            <div className="flex justify-end mt-4">
              <button
                className="bg-green-500 text-white p-2 rounded-lg shadow-lg hover:bg-green-600 transition"
                onClick={() => navigate("/Admin/addnotice")}
              >
                Add Notice
              </button>
            </div>
          ) : (
            <div className="w-full overflow-hidden bg-white rounded-lg shadow-lg">
              {Array.isArray(noticesList) && noticesList.length > 0 && (
                <TableTemplate
                  buttonHaver={NoticeButtonHaver}
                  columns={noticeColumns}
                  rows={noticeRows}
                />
              )}
              <div className="fixed bottom-4 right-4">
                {actions.map((action, index) => (
                  <button
                    key={index}
                    className="flex items-center gap-2 p-2 mb-2 bg-gray-200 rounded-full shadow-md hover:bg-gray-300 transition"
                    onClick={action.action}
                  >
                    {action.icon}
                    <span className="hidden md:inline-block">
                      {action.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ShowNotices;

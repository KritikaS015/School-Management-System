import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotices } from "../redux/noticeRelated/noticeHandle";
import TableViewTemplate from "./TableViewTemplate";

const SeeNotice = () => {
  const dispatch = useDispatch();

  // Select state
  const { currentUser, currentRole } = useSelector((state) => state.user);
  const {
    noticesList = [],
    loading,
    error,
    response,
  } = useSelector((state) => state.notice);

  useEffect(() => {
    // Check if currentUser and currentRole are defined
    if (currentUser && currentRole) {
      const userId =
        currentRole === "Admin" ? currentUser._id : currentUser.school?._id;

      // Check if userId is available
      if (userId) {
        dispatch(getAllNotices(userId, "Notice"));
      } else {
        console.error("User ID or school ID is missing");
      }
    } else {
      console.error("Current user or role is missing");
    }
  }, [dispatch, currentRole, currentUser?._id, currentUser?.school?._id]);

  if (error) {
    console.error("Error fetching notices:", error);
  }

  const noticeColumns = [
    { id: "title", label: "Title", minWidth: 170 },
    { id: "details", label: "Details", minWidth: 100 },
    { id: "date", label: "Date", minWidth: 170 },
  ];

  const noticeRows = noticesList.map((notice) => {
    const date = new Date(notice.date);
    const dateString =
      date.toString() !== "Invalid Date"
        ? date.toISOString().substring(0, 10)
        : "Invalid Date";
    return {
      title: notice.title || "No Title",
      details: notice.details || "No Details",
      date: dateString,
      id: notice._id || "No ID",
    };
  });

  return (
    <div className="mt-12 mr-5">
      {loading ? (
        <div className="text-2xl">Loading...</div>
      ) : response ? (
        <div className="text-2xl">No Notices to Show Right Now</div>
      ) : (
        <>
          <h3 className="text-3xl mb-10 -mt-4 font-bold text-white">Notices</h3>
          <div className="w-full -mt-5 overflow-hidden bg-white shadow-md rounded-lg">
            {Array.isArray(noticesList) && noticesList.length > 0 ? (
              <TableViewTemplate columns={noticeColumns} rows={noticeRows} />
            ) : (
              <div className="text-xl">No notices available</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SeeNotice;

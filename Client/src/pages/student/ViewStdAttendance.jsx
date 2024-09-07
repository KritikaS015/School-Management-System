import React, { useEffect, useState } from "react";
import { FaAngleDown, FaAngleUp, FaChartBar, FaTable } from "react-icons/fa"; // React Icons
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../redux/userRelated/userHandle";
import {
  calculateOverallAttendancePercentage,
  calculateSubjectAttendancePercentage,
  groupAttendanceBySubject,
} from "../../components/attendanceCalculator";
import CustomBarChart from "../../components/CustomBarChart";
import CustomTable from "../../components/CustomTable";
import CustomButton from "../../components/CustomButton";

const ViewStdAttendance = () => {
  const dispatch = useDispatch();
  const [openStates, setOpenStates] = useState({});
  const [selectedSection, setSelectedSection] = useState("table");

  const handleOpen = (subId) => {
    setOpenStates((prevState) => ({
      ...prevState,
      [subId]: !prevState[subId],
    }));
  };

  const { userDetails, currentUser, loading, response, error } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(getUserDetails(currentUser._id, "Student"));
  }, [dispatch, currentUser._id]);

  if (response) {
    console.log(response);
  } else if (error) {
    console.log(error);
  }

  const [subjectAttendance, setSubjectAttendance] = useState([]);

  useEffect(() => {
    if (userDetails) {
      setSubjectAttendance(userDetails.attendance || []);
    }
  }, [userDetails]);

  const attendanceBySubject = groupAttendanceBySubject(subjectAttendance);
  const overallAttendancePercentage =
    calculateOverallAttendancePercentage(subjectAttendance);

  const subjectData = Object.entries(attendanceBySubject).map(
    ([subName, { subCode, present, sessions }]) => {
      const subjectAttendancePercentage = calculateSubjectAttendancePercentage(
        present,
        sessions
      );
      return {
        subject: subName,
        attendancePercentage: subjectAttendancePercentage,
        totalClasses: sessions,
        attendedClasses: present,
      };
    }
  );

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  const renderTableSection = () => (
    <>
      <h2 className="text-3xl font-semibold text-center mb-4">Attendance</h2>
      <CustomTable
        headers={[
          "Subject",
          "Present",
          "Total Sessions",
          "Attendance Percentage",
          "Actions",
        ]}
        data={Object.entries(attendanceBySubject).map(
          ([subName, { present, allData, subId, sessions }]) => ({
            subject: subName,
            present,
            sessions,
            attendancePercentage: calculateSubjectAttendancePercentage(
              present,
              sessions
            ),
            actions: (
              <>
                <CustomButton
                  onClick={() => handleOpen(subId)}
                  className="flex items-center"
                >
                  {openStates[subId] ? (
                    <FaAngleUp className="mr-2" />
                  ) : (
                    <FaAngleDown className="mr-2" />
                  )}
                  Details
                </CustomButton>
                <CustomButton
                  onClick={() => handleRemoveAttendance(subId)}
                  color="error"
                >
                  Remove
                </CustomButton>
              </>
            ),
          })
        )}
        expandableData={(data) => (
          <div>
            <h3 className="text-lg font-semibold mb-2">Attendance Details</h3>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.allData && data.allData.length > 0 ? (
                  data.allData.map((data, index) => {
                    const date = new Date(data.date);
                    const dateString =
                      date.toString() !== "Invalid Date"
                        ? date.toISOString().substring(0, 10)
                        : "Invalid Date";
                    return (
                      <tr key={index}>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {dateString}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 text-right">
                          {data.status}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="2"
                      className="px-6 py-4 text-sm text-gray-900 text-center"
                    >
                      No details available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        expandedRowId={openStates}
        onRowClick={(subId) => handleOpen(subId)}
      />
      <div className="mt-4">
        Overall Attendance Percentage: {overallAttendancePercentage.toFixed(2)}%
      </div>
    </>
  );

  const renderChartSection = () => (
    <>
      <CustomBarChart chartData={subjectData} dataKey="attendancePercentage" />
    </>
  );

  return (
    <div className="p-4">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {subjectAttendance &&
          Array.isArray(subjectAttendance) &&
          subjectAttendance.length > 0 ? (
            <>
              {selectedSection === "table" && renderTableSection()}
              {selectedSection === "chart" && renderChartSection()}

              <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md py-2">
                <div className="flex justify-around">
                  <button
                    onClick={() => handleSectionChange("table")}
                    className={`flex items-center px-4 py-2 ${
                      selectedSection === "table" ? "bg-gray-200" : ""
                    }`}
                  >
                    <FaTable className="mr-2" />
                    Table
                  </button>
                  <button
                    onClick={() => handleSectionChange("chart")}
                    className={`flex items-center px-4 py-2 ${
                      selectedSection === "chart" ? "bg-gray-200" : ""
                    }`}
                  >
                    <FaChartBar className="mr-2" />
                    Chart
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-600 mt-4">
              Currently You Have No Attendance Details
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ViewStdAttendance;

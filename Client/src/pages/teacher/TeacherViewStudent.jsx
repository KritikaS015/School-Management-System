import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../redux/userRelated/userHandle";
import { useNavigate, useParams } from "react-router-dom";
import {
  calculateOverallAttendancePercentage,
  calculateSubjectAttendancePercentage,
  groupAttendanceBySubject,
} from "../../components/attendanceCalculator";
import CustomPieChart from "../../components/CustomPieChart";

const TeacherViewStudent = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { currentUser, userDetails, response, loading, error } = useSelector(
    (state) => state.user
  );

  const address = "Student";
  const studentID = params.id;
  const teachSubject = currentUser.teachSubject?.subName;
  const teachSubjectID = currentUser.teachSubject?._id;

  useEffect(() => {
    dispatch(getUserDetails(studentID, address));
  }, [dispatch, studentID]);

  if (response) console.log(response);
  if (error) console.log(error);

  const [sclassName, setSclassName] = useState("");
  const [studentSchool, setStudentSchool] = useState("");
  const [subjectMarks, setSubjectMarks] = useState("");
  const [subjectAttendance, setSubjectAttendance] = useState([]);
  const [openStates, setOpenStates] = useState({});

  const handleOpen = (subId) => {
    setOpenStates((prevState) => ({
      ...prevState,
      [subId]: !prevState[subId],
    }));
  };

  useEffect(() => {
    if (userDetails) {
      setSclassName(userDetails.sclassName || "");
      setStudentSchool(userDetails.school || "");
      setSubjectMarks(userDetails.examResult || "");
      setSubjectAttendance(userDetails.attendance || []);
    }
  }, [userDetails]);

  const overallAttendancePercentage =
    calculateOverallAttendancePercentage(subjectAttendance);
  const overallAbsentPercentage = 100 - overallAttendancePercentage;

  const chartData = [
    { name: "Present", value: overallAttendancePercentage },
    { name: "Absent", value: overallAbsentPercentage },
  ];

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="mt-3">
            <span>Name:</span> {userDetails.name}
          </div>
          <div>
            <span>Roll Number:</span> {userDetails.rollNum}
          </div>
          <div>
            <span>Class:</span> {sclassName.sclassName}
          </div>
          <div>
            <span>School:</span> {studentSchool.schoolName}
          </div>
          <br />

          <h3 className="font-bold text-lg">Attendance:</h3>
          {subjectAttendance &&
            Array.isArray(subjectAttendance) &&
            subjectAttendance.length > 0 && (
              <>
                {Object.entries(
                  groupAttendanceBySubject(subjectAttendance)
                ).map(
                  ([subName, { present, allData, subId, sessions }], index) => {
                    if (subName === teachSubject) {
                      const subjectAttendancePercentage =
                        calculateSubjectAttendancePercentage(present, sessions);

                      return (
                        <table key={index} className="min-w-full bg-white">
                          <thead>
                            <tr className="w-full bg-gray-200 text-left">
                              <th className="px-4 py-2">Subject</th>
                              <th className="px-4 py-2">Present</th>
                              <th className="px-4 py-2">Total Sessions</th>
                              <th className="px-4 py-2">
                                Attendance Percentage
                              </th>
                              <th className="px-4 py-2 text-center">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border px-4 py-2">{subName}</td>
                              <td className="border px-4 py-2">{present}</td>
                              <td className="border px-4 py-2">{sessions}</td>
                              <td className="border px-4 py-2">
                                {subjectAttendancePercentage}%
                              </td>
                              <td className="border px-4 py-2 text-center">
                                <button
                                  onClick={() => handleOpen(subId)}
                                  className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
                                >
                                  {openStates[subId] ? (
                                    <span>&#9650; Details</span>
                                  ) : (
                                    <span>&#9660; Details</span>
                                  )}
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan="5" className="p-0">
                                <div
                                  className={`overflow-hidden transition-all duration-300 ${
                                    openStates[subId]
                                      ? "max-h-screen"
                                      : "max-h-0"
                                  }`}
                                >
                                  <div className="p-4">
                                    <h4 className="font-bold text-base">
                                      Attendance Details
                                    </h4>
                                    <table className="min-w-full bg-gray-50 mt-2">
                                      <thead>
                                        <tr>
                                          <th className="px-4 py-2">Date</th>
                                          <th className="px-4 py-2 text-right">
                                            Status
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {allData.map((data, index) => {
                                          const date = new Date(data.date);
                                          const dateString =
                                            date.toString() !== "Invalid Date"
                                              ? date
                                                  .toISOString()
                                                  .substring(0, 10)
                                              : "Invalid Date";
                                          return (
                                            <tr key={index}>
                                              <td className="border px-4 py-2">
                                                {dateString}
                                              </td>
                                              <td className="border px-4 py-2 text-right">
                                                {data.status}
                                              </td>
                                            </tr>
                                          );
                                        })}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      );
                    } else {
                      return null;
                    }
                  }
                )}
                <div className="mt-4">
                  <span className="font-semibold">
                    Overall Attendance Percentage:
                  </span>{" "}
                  {overallAttendancePercentage.toFixed(2)}%
                </div>
                <CustomPieChart data={chartData} />
              </>
            )}
          <br />
          <button
            onClick={() =>
              navigate(
                `/Teacher/class/student/attendance/${studentID}/${teachSubjectID}`
              )
            }
            className="bg-blue-600 text-white py-2 px-4 rounded mt-4 hover:bg-blue-700"
          >
            Add Attendance
          </button>
          <br />
          <br />
          <h3 className="font-bold text-lg">Subject Marks:</h3>
          {subjectMarks &&
            Array.isArray(subjectMarks) &&
            subjectMarks.length > 0 && (
              <>
                {subjectMarks.map((result, index) => {
                  if (result.subName.subName === teachSubject) {
                    return (
                      <table key={index} className="min-w-full bg-white">
                        <thead>
                          <tr className="bg-gray-200 text-left">
                            <th className="px-4 py-2">Subject</th>
                            <th className="px-4 py-2">Marks</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border px-4 py-2">
                              {result.subName.subName}
                            </td>
                            <td className="border px-4 py-2">
                              {result.marksObtained}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    );
                  } else {
                    return null;
                  }
                })}
              </>
            )}
          <button
            onClick={() =>
              navigate(
                `/Teacher/class/student/marks/${studentID}/${teachSubjectID}`
              )
            }
            className="bg-purple-600 text-white py-2 px-4 rounded mt-4 hover:bg-purple-700"
          >
            Add Marks
          </button>
          <br />
          <br />
        </div>
      )}
    </>
  );
};

export default TeacherViewStudent;

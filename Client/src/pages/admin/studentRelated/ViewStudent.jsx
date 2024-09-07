import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getUserDetails,
  updateUser,
} from "../../../redux/userRelated/userHandle";
import { useNavigate, useParams } from "react-router-dom";
import { getSubjectList } from "../../../redux/sclassRelated/sclassHandle";
import {
  removeStuff,
  updateStudentFields,
} from "../../../redux/studentRelated/studentHandle";
import {
  calculateOverallAttendancePercentage,
  calculateSubjectAttendancePercentage,
  groupAttendanceBySubject,
} from "../../../components/attendanceCalculator";
import CustomBarChart from "../../../components/CustomBarChart";
import CustomPieChart from "../../../components/CustomPieChart";
import Popup from "../../../components/Popup";
import CustomTable from "../../../components/CustomTable"; // Assume custom table component
import CustomButton from "../../../components/CustomButton"; // Assume custom button component
import TabComponent from "../../../components/TabComponent";

const ViewStudent = () => {
  const [showTab, setShowTab] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { userDetails, response, loading, error } = useSelector(
    (state) => state.user
  );
  const studentID = params.id;
  const address = "Student";

  useEffect(() => {
    dispatch(getUserDetails(studentID, address));
  }, [dispatch, studentID]);

  useEffect(() => {
    if (
      userDetails &&
      userDetails.sclassName &&
      userDetails.sclassName._id !== undefined
    ) {
      dispatch(getSubjectList(userDetails.sclassName._id, "ClassSubjects"));
    }
  }, [dispatch, userDetails]);

  const [name, setName] = useState("");
  const [rollNum, setRollNum] = useState("");
  const [password, setPassword] = useState("");
  const [sclassName, setSclassName] = useState("");
  const [studentSchool, setStudentSchool] = useState("");
  const [subjectMarks, setSubjectMarks] = useState([]);
  const [subjectAttendance, setSubjectAttendance] = useState([]);

  const [openStates, setOpenStates] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const handleOpen = (subId) => {
    setOpenStates((prevState) => ({
      ...prevState,
      [subId]: !prevState[subId],
    }));
  };

  const [activeTab, setActiveTab] = useState("table");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const fields =
    password === "" ? { name, rollNum } : { name, rollNum, password };

  useEffect(() => {
    if (userDetails) {
      setName(userDetails.name || "");
      setRollNum(userDetails.rollNum || "");
      setSclassName(userDetails.sclassName || "");
      setStudentSchool(userDetails.school || "");
      setSubjectMarks(userDetails.examResult || []);
      setSubjectAttendance(userDetails.attendance || []);
    }
  }, [userDetails]);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(updateUser(fields, studentID, address))
      .then(() => {
        dispatch(getUserDetails(studentID, address));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteHandler = () => {
    // setMessage("Sorry the delete function has been disabled for now.");
    // setShowPopup(true);
    dispatch(deleteUser(studentID, address)).then(() => {
      navigate(-1);
    });
  };

  const removeHandler = (id, deladdress) => {
    dispatch(removeStuff(id, deladdress)).then(() => {
      dispatch(getUserDetails(studentID, address));
    });
  };

  const removeSubAttendance = (subId) => {
    dispatch(
      updateStudentFields(studentID, { subId }, "RemoveStudentSubAtten")
    ).then(() => {
      dispatch(getUserDetails(studentID, address));
    });
  };

  const overallAttendancePercentage =
    calculateOverallAttendancePercentage(subjectAttendance);
  const overallAbsentPercentage = 100 - overallAttendancePercentage;

  const chartData = [
    { name: "Present", value: overallAttendancePercentage },
    { name: "Absent", value: overallAbsentPercentage },
  ];

  const subjectData = Object.entries(
    groupAttendanceBySubject(subjectAttendance)
  ).map(([subName, { subCode, present, sessions }]) => {
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
  });

  const StudentAttendanceSection = () => {
    const renderTableSection = () => (
      <>
        <h3>Attendance:</h3>
        <CustomTable
          headers={[
            "Subject",
            "Present",
            "Total Sessions",
            "Attendance Percentage",
            "Actions",
          ]}
          data={Object.entries(groupAttendanceBySubject(subjectAttendance)).map(
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
                  <CustomButton onClick={() => handleOpen(subId)}>
                    {openStates[subId] ? "Hide Details" : "Show Details"}
                  </CustomButton>
                  <CustomButton
                    onClick={() => removeSubAttendance(subId)}
                    color="error"
                  >
                    Delete
                  </CustomButton>
                  <CustomButton
                    onClick={() =>
                      navigate(
                        `/Admin/subject/student/attendance/${studentID}/${subId}`
                      )
                    }
                  >
                    Change
                  </CustomButton>
                </>
              ),
            })
          )}
          expandableData={(data) => (
            <div>
              <h4>Attendance Details</h4>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.allData.map((item, index) => (
                    <tr key={index}>
                      <td>
                        {new Date(item.date).toISOString().substring(0, 10)}
                      </td>
                      <td>{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          expandedRowId={openStates}
          onRowClick={(subId) => handleOpen(subId)}
        />
        <div>
          Overall Attendance Percentage:{" "}
          {overallAttendancePercentage.toFixed(2)}%
        </div>
        <CustomButton
          onClick={() => removeHandler(studentID, "RemoveStudentAtten")}
          color="error"
        >
          Delete All
        </CustomButton>
        <CustomButton
          onClick={() =>
            navigate("/Admin/students/student/attendance/" + studentID)
          }
        >
          Add Attendance
        </CustomButton>
      </>
    );

    const renderChartSection = () => (
      <>
        <CustomBarChart
          chartData={subjectData}
          dataKey="attendancePercentage"
        />
      </>
    );

    return (
      <>
        {subjectAttendance && subjectAttendance.length > 0 ? (
          <>
            <TabComponent
              tabs={["Table", "Chart"]}
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
            {activeTab === "table" && renderTableSection()}
            {activeTab === "chart" && renderChartSection()}
          </>
        ) : (
          <CustomButton
            onClick={() =>
              navigate("/Admin/students/student/attendance/" + studentID)
            }
          >
            Add Attendance
          </CustomButton>
        )}
      </>
    );
  };

  const StudentMarksSection = () => {
    const renderTableSection = () => (
      <>
        <h3>Subject Marks:</h3>
        <CustomTable
          headers={["Subject", "Marks"]}
          data={subjectMarks.map((result, index) => ({
            subject: result.subName.subName,
            marks: result.marksObtained,
          }))}
        />
        <CustomButton
          onClick={() => navigate("/Admin/students/student/marks/" + studentID)}
        >
          Add Marks
        </CustomButton>
      </>
    );

    const renderChartSection = () => (
      <>
        <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />
      </>
    );

    return (
      <>
        {subjectMarks && subjectMarks.length > 0 ? (
          <>
            <TabComponent
              tabs={["Table", "Chart"]}
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
            {activeTab === "table" && renderTableSection()}
            {activeTab === "chart" && renderChartSection()}
          </>
        ) : (
          <CustomButton
            onClick={() =>
              navigate("/Admin/students/student/marks/" + studentID)
            }
          >
            Add Marks
          </CustomButton>
        )}
      </>
    );
  };

  const StudentDetailsSection = () => (
    <div>
      <p>Name: {userDetails.name}</p>
      <p>Roll Number: {userDetails.rollNum}</p>
      <p>Class: {userDetails.sclassName.sclassName}</p>
      <p>School: {userDetails.school}</p>
      <CustomButton onClick={submitHandler}>Update</CustomButton>
      <CustomButton onClick={deleteHandler} color="error">
        Delete
      </CustomButton>
    </div>
  );

  return (
    <div>
      <StudentDetailsSection />
      <StudentAttendanceSection />
      <StudentMarksSection />
      {showPopup && (
        <Popup message={message} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
};

export default ViewStudent;

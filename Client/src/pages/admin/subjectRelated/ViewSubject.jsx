import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getClassStudents,
  getSubjectDetails,
} from "../../../redux/sclassRelated/sclassHandle";
import {
  BlueButton,
  GreenButton,
  PurpleButton,
} from "../../../components/ButtonStyles";
import TextField from "../../../components/TextField"; // Custom TextField Component
import CircularProgress from "../../../components/CircularProgress"; // Custom CircularProgress Component
import { Tab, Tabs, TabPanel, TabList } from "../../../components/Tabs"; // Custom Tabs Components

const ViewSubject = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { subloading, subjectDetails, sclassStudents, getresponse, error } =
    useSelector((state) => state.sclass);

  const { classID, subjectID } = params;

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, "Subject"));
    dispatch(getClassStudents(classID));
  }, [dispatch, subjectID, classID]);

  if (error) {
    console.error(error);
  }

  const [selectedTab, setSelectedTab] = useState("1");
  const [selectedSection, setSelectedSection] = useState("attendance");

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleSectionChange = (newSection) => {
    setSelectedSection(newSection);
  };

  const studentColumns = [
    { id: "rollNum", label: "Roll No.", minWidth: 100 },
    { id: "name", label: "Name", minWidth: 170 },
  ];

  const studentRows = sclassStudents.map((student) => ({
    rollNum: student.rollNum,
    name: student.name,
    id: student._id,
  }));

  const StudentsAttendanceButtonHaver = ({ row }) => (
    <>
      <BlueButton onClick={() => navigate(`/Admin/students/student/${row.id}`)}>
        View
      </BlueButton>
      <PurpleButton
        onClick={() =>
          navigate(`/Admin/subject/student/attendance/${row.id}/${subjectID}`)
        }
      >
        Take Attendance
      </PurpleButton>
    </>
  );

  const StudentsMarksButtonHaver = ({ row }) => (
    <>
      <BlueButton onClick={() => navigate(`/Admin/students/student/${row.id}`)}>
        View
      </BlueButton>
      <PurpleButton
        onClick={() =>
          navigate(`/Admin/subject/student/marks/${row.id}/${subjectID}`)
        }
      >
        Provide Marks
      </PurpleButton>
    </>
  );

  const SubjectStudentsSection = () => (
    <>
      {getresponse ? (
        <div className="flex justify-end mb-4">
          <GreenButton
            onClick={() => navigate(`/Admin/class/addstudents/${classID}`)}
          >
            Add Students
          </GreenButton>
        </div>
      ) : (
        <>
          <h3 className="text-xl mb-4">Students List:</h3>
          {selectedSection === "attendance" && (
            <TableTemplate
              buttonHaver={StudentsAttendanceButtonHaver}
              columns={studentColumns}
              rows={studentRows}
            />
          )}
          {selectedSection === "marks" && (
            <TableTemplate
              buttonHaver={StudentsMarksButtonHaver}
              columns={studentColumns}
              rows={studentRows}
            />
          )}
          <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
            <Tabs value={selectedSection} onChange={handleSectionChange}>
              <Tab label="Attendance" value="attendance" />
              <Tab label="Marks" value="marks" />
            </Tabs>
          </div>
        </>
      )}
    </>
  );

  const SubjectDetailsSection = () => {
    const numberOfStudents = sclassStudents.length;

    return (
      <div className="flex justify-center items-center ">
        <div className="bg-sky-100 border border-black p-6 rounded-lg shadow-lg w-full max-w-4xl text-center ">
          <h2 className="text-2xl mb-4 font-bold">Subject Details</h2>
          <p className="text-lg mb-2 ">
            Subject Name: {subjectDetails?.subName}
          </p>
          <p className="text-lg mb-2">
            Subject Code: {subjectDetails?.subCode}
          </p>
          <p className="text-lg mb-2">
            Subject Sessions: {subjectDetails?.sessions}
          </p>
          <p className="text-lg mb-2">Number of Students: {numberOfStudents}</p>
          <p className="text-lg mb-4">
            Class Name: {subjectDetails?.sclassName?.sclassName}
          </p>
          {subjectDetails?.teacher ? (
            <p className="text-lg mb-4">
              Teacher Name: {subjectDetails.teacher.name}
            </p>
          ) : (
            <GreenButton
              onClick={() =>
                navigate(`/Admin/teachers/addteacher/${subjectDetails._id}`)
              }
            >
              Add Subject Teacher
            </GreenButton>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {subloading ? (
        <div>Loading...</div>
      ) : (
        <div className="p-4">
          <TabList value={selectedTab} onChange={handleTabChange}>
            <Tab label="Details" value="1" />
            <Tab label="Students" value="2" />
          </TabList>
          <div className="mt-8 mb-16">
            {selectedTab === "1" && <SubjectDetailsSection />}
            {selectedTab === "2" && <SubjectStudentsSection />}
          </div>
        </div>
      )}
    </>
  );
};

export default ViewSubject;

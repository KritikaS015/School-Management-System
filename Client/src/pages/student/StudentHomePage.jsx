import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculateOverallAttendancePercentage } from "../../components/attendanceCalculator";
import CustomPieChart from "../../components/CustomPieChart";
import { getUserDetails } from "../../redux/userRelated/userHandle";
import { getSubjectList } from "../../redux/sclassRelated/sclassHandle";
import CountUp from "react-countup";
import Subject from "../../assets/logo.webp";
import Assignment from "../../assets/logo.webp";
import SeeNotice from "../../components/SeeNotice";

const StudentHomePage = () => {
  const dispatch = useDispatch();
  const { userDetails, currentUser, loading, response } = useSelector(
    (state) => state.user
  );
  const { subjectsList } = useSelector((state) => state.sclass);

  const [subjectAttendance, setSubjectAttendance] = useState([]);
  const classID = currentUser.sclassName._id;

  useEffect(() => {
    dispatch(getUserDetails(currentUser._id, "Student"));
    dispatch(getSubjectList(classID, "ClassSubjects"));
  }, [dispatch, currentUser._id, classID]);

  const numberOfSubjects = subjectsList && subjectsList.length;

  useEffect(() => {
    if (userDetails) {
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
    <div className="container mx-auto mt-4 mb-4 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-[#222831] hover:bg-black rounded-lg shadow-md flex flex-col items-center justify-between h-52 text-center transition-transform duration-300 transform hover:scale-105">
          <img src={Subject} alt="Subjects" className="w-16 h-16 mb-4" />
          <p className="text-lg font-semibold text-white">Total Subjects</p>
          <CountUp
            start={0}
            end={numberOfSubjects}
            duration={2.5}
            className="text-green-500 text-2xl mt-2"
          />
        </div>
        <div className="p-4 bg-[#222831] hover:bg-black rounded-lg shadow-md flex flex-col items-center justify-between h-52 text-center transition-transform duration-300 transform hover:scale-105">
          <img src={Assignment} alt="Assignments" className="w-16 h-16 mb-4" />
          <p className="text-lg font-semibold text-white">Total Assignments</p>
          <CountUp
            start={0}
            end={15}
            duration={4}
            className="text-green-500 text-2xl mt-2"
          />
        </div>
        <div className="p-4 bg-[#222831] rounded-lg shadow-md flex flex-col items-center justify-center h-60 text-center">
          {response ? (
            <p className="text-white text-lg">No Attendance Found</p>
          ) : (
            <>
              {loading ? (
                <p className="text-white text-lg">Loading...</p>
              ) : subjectAttendance &&
                Array.isArray(subjectAttendance) &&
                subjectAttendance.length > 0 ? (
                <CustomPieChart data={chartData} />
              ) : (
                <p className="text-white text-lg">No Attendance Found</p>
              )}
            </>
          )}
        </div>
      </div>
      <div className="mt-4 p-2 bg-[#222831] rounded-lg shadow-md">
        <SeeNotice />
      </div>
    </div>
  );
};

export default StudentHomePage;

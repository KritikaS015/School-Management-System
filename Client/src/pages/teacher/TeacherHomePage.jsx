import React, { useEffect } from "react";
import CountUp from "react-countup";
import Students from "../../assets/img1.png";
import Lessons from "../../assets/img6.webp";
import Tests from "../../assets/img7.webp";
import Time from "../../assets/img8.webp";
import {
  getClassStudents,
  getSubjectDetails,
} from "../../redux/sclassRelated/sclassHandle";
import { useDispatch, useSelector } from "react-redux";
import SeeNotice from "../../components/SeeNotice";

const TeacherHomePage = () => {
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);
  const { subjectDetails, sclassStudents } = useSelector(
    (state) => state.sclass
  );

  const classID = currentUser.teachSclass?._id;
  const subjectID = currentUser.teachSubject?._id;

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, "Subject"));
    dispatch(getClassStudents(classID));
  }, [dispatch, subjectID, classID]);

  const numberOfStudents = sclassStudents?.length || 0;
  const numberOfSessions = subjectDetails?.sessions || 0;

  return (
    <div className="container mx-auto my-4 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#222831] hover:bg-black p-4 shadow-md rounded-lg flex flex-col items-center text-center h-48 transition-transform duration-300 transform hover:scale-105">
          <img src={Students} alt="Students" className="w-16 h-16 mb-2" />
          <p className="text-lg font-semibold text-white mb-2">
            Class Students
          </p>
          <CountUp
            start={0}
            end={numberOfStudents}
            duration={2.5}
            className="text-green-500 text-2xl"
          />
        </div>
        <div className="bg-[#222831] hover:bg-black p-4 shadow-md rounded-lg flex flex-col items-center text-center h-48 transition-transform duration-300 transform hover:scale-105">
          <img src={Lessons} alt="Lessons" className="w-16 h-16 mb-2" />
          <p className="text-lg font-semibold text-white mb-2">Total Lessons</p>
          <CountUp
            start={0}
            end={numberOfSessions}
            duration={5}
            className="text-green-500 text-2xl"
          />
        </div>
        <div className="bg-[#222831] hover:bg-black p-4 shadow-md rounded-lg flex flex-col items-center text-center h-48 transition-transform duration-300 transform hover:scale-105">
          <img src={Tests} alt="Tests" className="w-16 h-16 mb-2" />
          <p className="text-lg font-semibold text-white mb-2">Tests Taken</p>
          <CountUp
            start={0}
            end={24}
            duration={4}
            className="text-green-500 text-2xl"
          />
        </div>
        <div className="bg-[#222831] hover:bg-black p-4 shadow-md rounded-lg flex flex-col items-center text-center h-48 transition-transform duration-300 transform hover:scale-105">
          <img src={Time} alt="Time" className="w-16 h-16 mb-2" />
          <p className="text-lg font-semibold text-white mb-2">Total Hours</p>
          <CountUp
            start={0}
            end={30}
            duration={4}
            suffix="hrs"
            className="text-green-500 text-2xl"
          />
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-4 bg-[#222831] p-4 shadow-md rounded-lg">
          <SeeNotice />
        </div>
      </div>
    </div>
  );
};

export default TeacherHomePage;

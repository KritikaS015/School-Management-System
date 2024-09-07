import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSclasses } from "../../redux/sclassRelated/sclassHandle";
import { getAllStudents } from "../../redux/studentRelated/studentHandle";
import { getAllTeachers } from "../../redux/teacherRelated/teacherHandle";
import CountUp from "react-countup";
import SeeNotice from "../../components/SeeNotice";
import Students from "../../assets/img1.png";
import Classes from "../../assets/img2.png";
import Teachers from "../../assets/img3.png";
import Fees from "../../assets/img4.png";

const AdminHomePage = () => {
  const dispatch = useDispatch();
  const { studentsList } = useSelector((state) => state.student);
  const { sclassesList } = useSelector((state) => state.sclass);
  const { teachersList } = useSelector((state) => state.teacher);
  const { currentUser } = useSelector((state) => state.user);
  const adminID = currentUser._id;

  useEffect(() => {
    dispatch(getAllStudents(adminID));
    dispatch(getAllSclasses(adminID, "Sclass"));
    dispatch(getAllTeachers(adminID));
  }, [adminID, dispatch]);

  const numberOfStudents = studentsList && studentsList.length;
  const numberOfClasses = sclassesList && sclassesList.length;
  const numberOfTeachers = teachersList && teachersList.length;

  return (
    <div className="container mx-auto my-8 px-4  ">
      {" "}
      {/* Updated background color */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-[#222831] hover:bg-black p-4 shadow-md rounded-lg flex flex-col items-center text-center transition-transform duration-300 transform hover:scale-105">
          <img src={Students} alt="Students" className="w-20 h-20 mb-4" />
          <p className="text-lg text-white font-semibold mb-2">
            Total Students
          </p>
          <CountUp
            start={0}
            end={numberOfStudents}
            duration={2.5}
            className="text-2xl text-green-500"
          />
        </div>
        <div className="bg-[#222831] hover:bg-black p-4 shadow-md rounded-lg flex flex-col items-center text-center transition-transform duration-300 transform hover:scale-105">
          <img src={Classes} alt="Classes" className="w-20 h-20 mb-4" />
          <p className="text-lg text-white font-semibold mb-2">Total Classes</p>
          <CountUp
            start={0}
            end={numberOfClasses}
            duration={5}
            className="text-2xl text-green-500"
          />
        </div>
        <div className="bg-[#222831] hover:bg-black p-4 shadow-md rounded-lg flex flex-col items-center text-center transition-transform duration-300 transform hover:scale-105">
          <img src={Teachers} alt="Teachers" className="w-20 h-20 mb-4" />
          <p className="text-lg text-white font-semibold mb-2">
            Total Teachers
          </p>
          <CountUp
            start={0}
            end={numberOfTeachers}
            duration={2.5}
            className="text-2xl text-green-500"
          />
        </div>
        <div className="bg-[#222831] hover:bg-black p-4 shadow-md rounded-lg flex flex-col items-center text-center transition-transform duration-300 transform hover:scale-105">
          <img src={Fees} alt="Fees" className="w-20 h-20 mb-4" />
          <p className="text-lg text-white font-semibold mb-2">
            Fees Collection
          </p>
          <CountUp
            start={0}
            end={23000}
            duration={2.5}
            prefix="$"
            className="text-2xl text-green-500"
          />
        </div>
        <div className="col-span-1 text-white lg:col-span-4 bg-[#222831] p-4  shadow-md rounded-lg">
          <SeeNotice />
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;

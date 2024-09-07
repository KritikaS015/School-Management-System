import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaUserPlus, FaUserMinus } from "react-icons/fa"; // Using react-icons for alternatives
import {
  getClassDetails,
  getClassStudents,
  getSubjectList,
} from "../../../redux/sclassRelated/sclassHandle";
import { deleteUser } from "../../../redux/userRelated/userHandle";
import { resetSubjects } from "../../../redux/sclassRelated/sclassSlice";
import Popup from "../../../components/Popup";
import TableTemplate from "../../../components/TableTemplate";
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import { FaArrowLeft, FaTrashAlt, FaPlus } from "react-icons/fa";
import { AiOutlineUserAdd, AiOutlineUserDelete } from "react-icons/ai";

const ClassDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    subjectsList,
    sclassStudents,
    sclassDetails,
    loading,
    error,
    response,
    getresponse,
  } = useSelector((state) => state.sclass);

  const classID = params.id;

  useEffect(() => {
    dispatch(getClassDetails(classID, "Sclass"));
    dispatch(getSubjectList(classID, "ClassSubjects"));
    dispatch(getClassStudents(classID));
  }, [dispatch, classID]);

  if (error) {
    console.log(error);
  }

  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => setValue(newValue);

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const deleteHandler = (deleteID, address) => {
    console.log(deleteID);
    console.log(address);
    setMessage("Sorry the delete function has been disabled for now.");
    setShowPopup(true);
    // dispatch(deleteUser(deleteID, address))
    //     .then(() => {
    //         dispatch(getClassStudents(classID));
    //         dispatch(resetSubjects());
    //         dispatch(getSubjectList(classID, "ClassSubjects"));
    //     });
  };

  const subjectColumns = [
    { id: "name", label: "Subject Name", minWidth: 170 },
    { id: "code", label: "Subject Code", minWidth: 100 },
  ];

  const subjectRows =
    subjectsList &&
    subjectsList.length > 0 &&
    subjectsList.map((subject) => ({
      name: subject.subName,
      code: subject.subCode,
      id: subject._id,
    }));

  const SubjectsButtonHaver = ({ row }) => (
    <>
      <button
        onClick={() => deleteHandler(row.id, "Subject")}
        className="text-red-600 hover:text-red-800"
      >
        <FaTrashAlt size={20} />
      </button>
      <button
        onClick={() => navigate(`/Admin/class/subject/${classID}/${row.id}`)}
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        View
      </button>
    </>
  );

  const subjectActions = [
    {
      icon: <FaPlus className="text-blue-500" />,
      name: "Add New Subject",
      action: () => navigate("/Admin/addsubject/" + classID),
    },
    {
      icon: <FaTrashAlt className="text-red-600" />,
      name: "Delete All Subjects",
      action: () => deleteHandler(classID, "SubjectsClass"),
    },
  ];

  const ClassSubjectsSection = () => (
    <>
      {response ? (
        <div className="flex justify-end mt-4">
          <button
            onClick={() => navigate("/Admin/addsubject/" + classID)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add Subjects
          </button>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">Subjects List:</h2>
          <TableTemplate
            buttonHaver={SubjectsButtonHaver}
            columns={subjectColumns}
            rows={subjectRows}
          />
          <SpeedDialTemplate actions={subjectActions} />
        </>
      )}
    </>
  );

  const studentColumns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "rollNum", label: "Roll Number", minWidth: 100 },
  ];

  const studentRows = sclassStudents.map((student) => ({
    name: student.name,
    rollNum: student.rollNum,
    id: student._id,
  }));

  const StudentsButtonHaver = ({ row }) => (
    <>
      <button
        onClick={() => deleteHandler(row.id, "Student")}
        className="text-red-600  hover:text-red-800"
      >
        <FaUserMinus className="text-xl mr-2" />
      </button>
      <button
        onClick={() => navigate("/Admin/students/student/" + row.id)}
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        View
      </button>
      <button
        onClick={() => navigate("/Admin/students/student/attendance/" + row.id)}
        className="ml-2 px-4 py-2 bg-purple-800 text-white rounded hover:bg-purple-600"
      >
        Attendance
      </button>
    </>
  );

  const studentActions = [
    {
      icon: <AiOutlineUserAdd className="text-blue-500" />,
      name: "Add New Student",
      action: () => navigate("/Admin/class/addstudents/" + classID),
    },
    {
      icon: <AiOutlineUserDelete className="text-red-600" />,
      name: "Delete All Students",
      action: () => deleteHandler(classID, "StudentsClass"),
    },
  ];

  const ClassStudentsSection = () => (
    <>
      {getresponse ? (
        <div className="flex justify-end mt-4">
          <button
            onClick={() => navigate("/Admin/class/addstudents/" + classID)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add Students
          </button>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">Students List:</h2>
          <TableTemplate
            buttonHaver={StudentsButtonHaver}
            columns={studentColumns}
            rows={studentRows}
          />
          <SpeedDialTemplate actions={studentActions} />
        </>
      )}
    </>
  );

  const ClassTeachersSection = () => <div>Teachers</div>;

  const ClassDetailsSection = () => {
    const numberOfSubjects = subjectsList.length;
    const numberOfStudents = sclassStudents.length;

    return (
      <>
        <h1 className="text-4xl font-bold text-center mb-4 text-blue-800">
          Class Details
        </h1>
        <div className="flex justify-center items-center">
          <div className="bg-blue-100 p-6 rounded-lg shadow-lg border border-black max-w-4xl w-full sm:max-w-3xl md:max-w-2xl lg:max-w-xl">
            <h2 className="text-2xl font-bold mb-2 text-blue-700">
              This is Class {sclassDetails && sclassDetails.sclassName}
            </h2>
            <h3 className="text-xl mb-2 text-blue-600">
              Number of Subjects: {numberOfSubjects}
            </h3>
            <h3 className="text-xl mb-4 text-blue-600">
              Number of Students: {numberOfStudents}
            </h3>
            {getresponse && (
              <button
                onClick={() => navigate("/Admin/class/addstudents/" + classID)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add Students
              </button>
            )}
            {response && (
              <button
                onClick={() => navigate("/Admin/addsubject/" + classID)}
                className="ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add Subjects
              </button>
            )}
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="w-full">
            <div className="border-b border-gray-300">
              <div className="flex space-x-4 overflow-x-auto bg-gray-100 py-2">
                <button
                  onClick={() => setValue("1")}
                  className={`px-4 py-2 ${
                    value === "1" ? "bg-blue-500 text-white" : "bg-gray-200"
                  } rounded`}
                >
                  Details
                </button>
                <button
                  onClick={() => setValue("2")}
                  className={`px-4 py-2 ${
                    value === "2" ? "bg-blue-500 text-white" : "bg-gray-200"
                  } rounded`}
                >
                  Subjects
                </button>
                <button
                  onClick={() => setValue("3")}
                  className={`px-4 py-2 ${
                    value === "3" ? "bg-blue-500 text-white" : "bg-gray-200"
                  } rounded`}
                >
                  Students
                </button>
                <button
                  onClick={() => setValue("4")}
                  className={`px-4 py-2 ${
                    value === "4" ? "bg-blue-500 text-white" : "bg-gray-200"
                  } rounded`}
                >
                  Teachers
                </button>
              </div>
            </div>
            {value === "1" && <ClassDetailsSection />}
            {value === "2" && <ClassSubjectsSection />}
            {value === "3" && <ClassStudentsSection />}
            {value === "4" && <ClassTeachersSection />}
          </div>
          {showPopup && (
            <Popup message={message} onClose={() => setShowPopup(false)} />
          )}
        </>
      )}
    </>
  );
};

export default ClassDetails;

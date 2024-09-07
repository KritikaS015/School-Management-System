import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getClassStudents } from "../../redux/sclassRelated/sclassHandle";
import { FaAngleDown, FaAngleUp } from "react-icons/fa"; // React Icons

const TeacherClassDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sclassStudents, loading, error, getresponse } = useSelector(
    (state) => state.sclass
  );
  const { currentUser } = useSelector((state) => state.user);

  const classID = currentUser.teachSclass?._id;
  const subjectID = currentUser.teachSubject?._id;

  useEffect(() => {
    dispatch(getClassStudents(classID));
  }, [dispatch, classID]);

  if (error) {
    console.log(error);
  }

  const studentColumns = [
    { id: "name", label: "Name" },
    { id: "rollNum", label: "Roll Number" },
  ];

  const studentRows = sclassStudents.map((student) => ({
    name: student.name,
    rollNum: student.rollNum,
    id: student._id,
  }));

  const StudentsButtonHaver = ({ row }) => {
    const options = ["Take Attendance", "Provide Marks"];

    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleClick = () => {
      if (selectedIndex === 0) {
        handleAttendance();
      } else if (selectedIndex === 1) {
        handleMarks();
      }
    };

    const handleAttendance = () => {
      navigate(`/Teacher/class/student/attendance/${row.id}/${subjectID}`);
    };
    const handleMarks = () => {
      navigate(`/Teacher/class/student/marks/${row.id}/${subjectID}`);
    };

    const handleMenuItemClick = (event, index) => {
      setSelectedIndex(index);
      setOpen(false);
    };

    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }

      setOpen(false);
    };

    return (
      <div className="flex items-center space-x-2">
        <button
          onClick={() => navigate("/Teacher/class/student/" + row.id)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          View
        </button>
        <div className="relative">
          <button
            ref={anchorRef}
            onClick={handleToggle}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
          >
            {options[selectedIndex]}
            {open ? (
              <FaAngleUp className="ml-2" />
            ) : (
              <FaAngleDown className="ml-2" />
            )}
          </button>
          {open && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md z-10">
              <ul className="py-1">
                {options.map((option, index) => (
                  <li
                    key={option}
                    className={`px-4 py-2 cursor-pointer ${
                      index === selectedIndex ? "bg-gray-200" : ""
                    }`}
                    onClick={(event) => handleMenuItemClick(event, index)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1 className="text-3xl font-semibold text-center mb-4">
            Class Details
          </h1>
          {getresponse ? (
            <div className="text-center text-gray-600">No Students Found</div>
          ) : (
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
              <h2 className="text-2xl font-semibold p-4 border-b">
                Students List:
              </h2>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    {studentColumns.map((column) => (
                      <th
                        key={column.id}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {column.label}
                      </th>
                    ))}
                    <th className="px-6 py-3"></th> {/* For action buttons */}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {studentRows.map((row) => (
                    <tr key={row.id}>
                      {studentColumns.map((column) => (
                        <td
                          key={column.id}
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                        >
                          {row[column.id]}
                        </td>
                      ))}
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <StudentsButtonHaver row={row} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TeacherClassDetails;

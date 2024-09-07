import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubjectList } from "../../redux/sclassRelated/sclassHandle";
import { getUserDetails } from "../../redux/userRelated/userHandle";
import CustomBarChart from "../../components/CustomBarChart";
import { FaChartBar, FaTable } from "react-icons/fa"; // React Icons for chart and table icons

const StudentSubjects = () => {
  const dispatch = useDispatch();
  const { subjectsList, sclassDetails } = useSelector((state) => state.sclass);
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

  const [subjectMarks, setSubjectMarks] = useState([]);
  const [selectedSection, setSelectedSection] = useState("table");

  useEffect(() => {
    if (userDetails) {
      setSubjectMarks(userDetails.examResult || []);
    }
  }, [userDetails]);

  useEffect(() => {
    if (subjectMarks.length === 0) {
      dispatch(getSubjectList(currentUser.sclassName._id, "ClassSubjects"));
    }
  }, [subjectMarks, dispatch, currentUser.sclassName._id]);

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  const renderTableSection = () => {
    return (
      <>
        <h2 className="text-4xl font-semibold text-center mb-4 mt-2 bg-[#EDF2F6]">
          Subject Marks
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-[#3F3F44] text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Marks
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#a2a2d0] divide-y divide-gray-200">
              {subjectMarks.map((result, index) => {
                if (!result.subName || !result.marksObtained) {
                  return null;
                }
                return (
                  <tr
                    key={index}
                    className="hover:bg-white even:hover:bg-[#F7F7F7]"
                  >
                    <td className="px-6 py-4 text-lg text-black">
                      {result.subName.subName}
                    </td>
                    <td className="px-6 py-4 text-lg text-black">
                      {result.marksObtained}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  const renderChartSection = () => {
    return <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />;
  };

  const renderClassDetailsSection = () => {
    return (
      <div className="p-4">
        <h2 className="text-4xl font-semibold text-center mb-4">
          Class Details
        </h2>
        <p className="text-2xl text-center mb-4">
          You are currently in Class {sclassDetails && sclassDetails.sclassName}
        </p>
        <p className="text-xl text-center mb-4">And these are the subjects:</p>
        {subjectsList &&
          subjectsList.map((subject, index) => (
            <div key={index} className="mb-2 text-center">
              <p className="text-lg">
                {subject.subName} ({subject.subCode})
              </p>
            </div>
          ))}
      </div>
    );
  };

  return (
    <div className="relative min-h-screen">
      {loading ? (
        <div className="text-center text-gray-600 mt-4">Loading...</div>
      ) : (
        <>
          {subjectMarks &&
          Array.isArray(subjectMarks) &&
          subjectMarks.length > 0 ? (
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
            renderClassDetailsSection()
          )}
        </>
      )}
    </div>
  );
};

export default StudentSubjects;

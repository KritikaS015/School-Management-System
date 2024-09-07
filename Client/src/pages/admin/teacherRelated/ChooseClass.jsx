import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllSclasses } from "../../../redux/sclassRelated/sclassHandle";
import TableTemplate from "../../../components/TableTemplate";

const ChooseClass = ({ situation }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { sclassesList, loading, error, getresponse } = useSelector(
    (state) => state.sclass
  );
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllSclasses(currentUser._id, "Sclass"));
  }, [currentUser._id, dispatch]);

  if (error) {
    console.log(error);
  }

  const navigateHandler = (classID) => {
    if (situation === "Teacher") {
      navigate("/Admin/teachers/choosesubject/" + classID);
    } else if (situation === "Subject") {
      navigate("/Admin/addsubject/" + classID);
    }
  };

  const sclassColumns = [{ id: "name", label: "Class Name", minWidth: 170 }];

  const sclassRows =
    sclassesList &&
    sclassesList.length > 0 &&
    sclassesList.map((sclass) => {
      return {
        name: sclass.sclassName,
        id: sclass._id,
      };
    });

  const SclassButtonHaver = ({ row }) => {
    return (
      <button
        className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition duration-300"
        onClick={() => navigateHandler(row.id)}
      >
        Choose
      </button>
    );
  };

  return (
    <div className="p-4">
      {loading ? (
        <div className="text-center text-gray-700">Loading...</div>
      ) : (
        <>
          {getresponse ? (
            <div className="flex justify-end mb-4">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                onClick={() => navigate("/Admin/addclass")}
              >
                Add Class
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-4">Choose a class</h2>
              {Array.isArray(sclassesList) && sclassesList.length > 0 && (
                <TableTemplate
                  buttonHaver={SclassButtonHaver}
                  columns={sclassColumns}
                  rows={sclassRows}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ChooseClass;

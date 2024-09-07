import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllComplains } from "../../../redux/complainRelated/complainHandle";
import TableTemplate from "../../../components/TableTemplate";

const SeeComplains = () => {
  const dispatch = useDispatch();
  const { complainsList, loading, error, response } = useSelector(
    (state) => state.complain
  );
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllComplains(currentUser._id, "Complain"));
  }, [currentUser._id, dispatch]);

  if (error) {
    console.log(error);
  }

  const complainColumns = [
    { id: "user", label: "User", minWidth: 170 },
    { id: "complaint", label: "Complaint", minWidth: 100 },
    { id: "date", label: "Date", minWidth: 170 },
  ];

  const complainRows =
    complainsList &&
    complainsList.length > 0 &&
    complainsList.map((complain) => {
      const date = new Date(complain.date);
      const dateString =
        date.toString() !== "Invalid Date"
          ? date.toISOString().substring(0, 10)
          : "Invalid Date";
      return {
        user: complain.user.name,
        complaint: complain.complaint,
        date: dateString,
        id: complain._id,
      };
    });

  const ComplainButtonHaver = ({ row }) => {
    return (
      <>
        <input
          type="checkbox"
          className="h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
          aria-label="Checkbox demo"
        />
      </>
    );
  };

  return (
    <>
      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : (
        <>
          {response ? (
            <div className="flex justify-center mt-4 ">
              No Complains Right Now
            </div>
          ) : (
            <div className="w-full overflow-hidden">
              {Array.isArray(complainsList) && complainsList.length > 0 && (
                <TableTemplate
                  buttonHaver={ComplainButtonHaver}
                  columns={complainColumns}
                  rows={complainRows}
                />
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default SeeComplains;

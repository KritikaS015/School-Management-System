import React from "react";

const TeacherDetail = () => {
  return (
    <div className="teacher-detail-container p-4">
      {/* Box for Teacher Details */}
      <div className="teacher-box p-4 border rounded-lg shadow-md bg-white">
        <h2 className="text-xl font-bold mb-2">Teacher Details</h2>
        <p className="mb-1">
          <span className="font-semibold">Name:</span> Jane Smith
        </p>
        <p className="mb-1">
          <span className="font-semibold">Subject:</span> Science
        </p>
        <p className="mb-1">
          <span className="font-semibold">Experience:</span> 10 Years
        </p>
        <p className="mb-1">
          <span className="font-semibold">Contact:</span> jane.smith@example.com
        </p>
        {/* Additional details can be added here */}
      </div>

      {/* Additional sections for the Teacher Detail page */}
      {/* For example, a section for the teacher's schedule, classes, etc. */}
      <div className="mt-6 p-4 border rounded-lg shadow-md bg-white">
        <h3 className="text-lg font-bold mb-2">Classes Taught</h3>
        <ul className="list-disc list-inside">
          <li>Math 101</li>
          <li>Science 202</li>
          {/* Add other classes here */}
        </ul>
      </div>
    </div>
  );
};

export default TeacherDetail;

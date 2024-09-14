import { Router } from "express";
import {
  adminRegister,
  adminLogIn,
  getAdminDetail,
} from "../controllers/admin-controller.js";
import {
  sclassCreate,
  sclassList,
  deleteSclass,
  deleteSclasses,
  getSclassDetail,
  getSclassStudents,
} from "../controllers/class-controller.js";
import {
  complainCreate,
  complainList,
} from "../controllers/complain-controller.js";
import {
  noticeCreate,
  noticeList,
  deleteNotices,
  deleteNotice,
  updateNotice,
} from "../controllers/notice-controller.js";
import {
  studentRegister,
  studentLogIn,
  getStudents,
  getStudentDetail,
  deleteStudents,
  deleteStudent,
  updateStudent,
  studentAttendance,
  deleteStudentsByClass,
  updateExamResult,
  clearAllStudentsAttendanceBySubject,
  clearAllStudentsAttendance,
  removeStudentAttendanceBySubject,
  removeStudentAttendance,
} from "../controllers/student_controller.js";
import {
  subjectCreate,
  classSubjects,
  deleteSubjectsByClass,
  getSubjectDetail,
  deleteSubject,
  freeSubjectList,
  allSubjects,
  deleteSubjects,
} from "../controllers/subject-controller.js";
import {
  teacherRegister,
  teacherLogIn,
  getTeachers,
  getTeacherDetail,
  deleteTeachers,
  deleteTeachersByClass,
  deleteTeacher,
  updateTeacherSubject,
  teacherAttendance,
} from "../controllers/teacher-controller.js";

const router = Router();

// Admin
router.post("/AdminReg", adminRegister);
router.post("/AdminLogin", adminLogIn);
router.get("/Admin/:id", getAdminDetail);

// Student
router.post("/StudentReg", studentRegister);
router.post("/StudentLogin", studentLogIn);
router.get("/Students/:id", getStudents);
router.get("/Student/:id", getStudentDetail);
router.delete("/Students/:id", deleteStudents);
router.delete("/StudentsClass/:id", deleteStudentsByClass);
router.delete("/Student/:id", deleteStudent);
router.put("/Student/:id", updateStudent);
router.put("/UpdateExamResult/:id", updateExamResult);
router.put("/StudentAttendance/:id", studentAttendance);
router.put(
  "/RemoveAllStudentsSubAtten/:id",
  clearAllStudentsAttendanceBySubject
);
router.put("/RemoveAllStudentsAtten/:id", clearAllStudentsAttendance);
router.put("/RemoveStudentSubAtten/:id", removeStudentAttendanceBySubject);
router.put("/RemoveStudentAtten/:id", removeStudentAttendance);

// Teacher
router.post("/TeacherReg", teacherRegister);
router.post("/TeacherLogin", teacherLogIn);
router.get("/Teachers/:id", getTeachers);
router.get("/Teacher/:id", getTeacherDetail);
router.delete("/Teachers/:id", deleteTeachers);
router.delete("/TeachersClass/:id", deleteTeachersByClass);
router.delete("/Teacher/:id", deleteTeacher);
router.put("/TeacherSubject", updateTeacherSubject);
router.post("/TeacherAttendance/:id", teacherAttendance);

// Notice
router.post("/NoticeCreate", noticeCreate);
router.get("/NoticeList/:id", noticeList);
router.delete("/Notices/:id", deleteNotices);
router.delete("/Notice/:id", deleteNotice);
router.put("/Notice/:id", updateNotice);

// Complain
router.post("/ComplainCreate", complainCreate);
router.get("/ComplainList/:id", complainList);

// Sclass
router.post("/SclassCreate", sclassCreate);
router.get("/SclassList/:id", sclassList);
router.get("/Sclass/:id", getSclassDetail);
router.get("/Sclass/Students/:id", getSclassStudents);
router.delete("/Sclasses/:id", deleteSclasses);
router.delete("/Sclass/:id", deleteSclass);

// Subject
router.post("/SubjectCreate", subjectCreate);
router.get("/AllSubjects/:id", allSubjects);
router.get("/ClassSubjects/:id", classSubjects);
router.get("/FreeSubjectList/:id", freeSubjectList);
router.get("/Subject/:id", getSubjectDetail);
router.delete("/Subject/:id", deleteSubject);
router.delete("/Subjects/:id", deleteSubjects);
router.delete("/SubjectsClass/:id", deleteSubjectsByClass);

export default router;

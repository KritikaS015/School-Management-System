import Sclass from "../models/sclassSchema.js";
import Student from "../models/studentSchema.js";
import Subject from "../models/subjectSchema.js";
import Teacher from "../models/teacherSchema.js";

// Create a new class
export const sclassCreate = async (req, res) => {
  try {
    const sclass = new Sclass({
      sclassName: req.body.sclassName,
      school: req.body.adminID,
    });

    const existingSclassByName = await Sclass.findOne({
      sclassName: req.body.sclassName,
      school: req.body.adminID,
    });

    if (existingSclassByName) {
      res.send({ message: "Sorry this class name already exists" });
    } else {
      const result = await sclass.save();
      res.send(result);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// List all classes for a given school
export const sclassList = async (req, res) => {
  try {
    let sclasses = await Sclass.find({ school: req.params.id });
    if (sclasses.length > 0) {
      res.send(sclasses);
    } else {
      res.send({ message: "No sclasses found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get details of a specific class
export const getSclassDetail = async (req, res) => {
  try {
    let sclass = await Sclass.findById(req.params.id);
    if (sclass) {
      sclass = await sclass.populate("school", "schoolName");
      res.send(sclass);
    } else {
      res.send({ message: "No class found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get students of a specific class
export const getSclassStudents = async (req, res) => {
  try {
    let students = await Student.find({ sclassName: req.params.id });
    if (students.length > 0) {
      let modifiedStudents = students.map((student) => {
        return { ...student._doc, password: undefined };
      });
      res.send(modifiedStudents);
    } else {
      res.send({ message: "No students found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete a specific class and its associated data
export const deleteSclass = async (req, res) => {
  try {
    const deletedClass = await Sclass.findByIdAndDelete(req.params.id);
    if (!deletedClass) {
      return res.send({ message: "Class not found" });
    }
    const deletedStudents = await Student.deleteMany({
      sclassName: req.params.id,
    });
    const deletedSubjects = await Subject.deleteMany({
      sclassName: req.params.id,
    });
    const deletedTeachers = await Teacher.deleteMany({
      teachSclass: req.params.id,
    });
    res.send(deletedClass);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete all classes for a given school and its associated data
export const deleteSclasses = async (req, res) => {
  try {
    const deletedClasses = await Sclass.deleteMany({ school: req.params.id });
    if (deletedClasses.deletedCount === 0) {
      return res.send({ message: "No classes found to delete" });
    }
    const deletedStudents = await Student.deleteMany({ school: req.params.id });
    const deletedSubjects = await Subject.deleteMany({ school: req.params.id });
    const deletedTeachers = await Teacher.deleteMany({ school: req.params.id });
    res.send(deletedClasses);
  } catch (error) {
    res.status(500).json(error);
  }
};

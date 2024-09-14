import Subject from "../models/subjectSchema.js";
import Teacher from "../models/teacherSchema.js";
import Student from "../models/studentSchema.js";

// Create new subjects
export const subjectCreate = async (req, res) => {
  try {
    const subjects = req.body.subjects.map((subject) => ({
      subName: subject.subName,
      subCode: subject.subCode,
      sessions: subject.sessions,
    }));

    const existingSubjectBySubCode = await Subject.findOne({
      "subjects.subCode": subjects[0].subCode,
      school: req.body.adminID,
    });

    if (existingSubjectBySubCode) {
      res.send({
        message: "Sorry, this subcode must be unique as it already exists",
      });
    } else {
      const newSubjects = subjects.map((subject) => ({
        ...subject,
        sclassName: req.body.sclassName,
        school: req.body.adminID,
      }));

      const result = await Subject.insertMany(newSubjects);
      res.send(result);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get all subjects for a school
export const allSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({ school: req.params.id }).populate(
      "sclassName",
      "sclassName"
    );
    if (subjects.length > 0) {
      res.send(subjects);
    } else {
      res.send({ message: "No subjects found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get subjects for a specific class
export const classSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({ sclassName: req.params.id });
    if (subjects.length > 0) {
      res.send(subjects);
    } else {
      res.send({ message: "No subjects found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get list of free subjects (not assigned to any teacher)
export const freeSubjectList = async (req, res) => {
  try {
    const subjects = await Subject.find({
      sclassName: req.params.id,
      teacher: { $exists: false },
    });
    if (subjects.length > 0) {
      res.send(subjects);
    } else {
      res.send({ message: "No subjects found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get details of a specific subject
export const getSubjectDetail = async (req, res) => {
  try {
    let subject = await Subject.findById(req.params.id);
    if (subject) {
      subject = await subject.populate("sclassName", "sclassName");
      subject = await subject.populate("teacher", "name");
      res.send(subject);
    } else {
      res.send({ message: "No subject found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete a specific subject
export const deleteSubject = async (req, res) => {
  try {
    const deletedSubject = await Subject.findByIdAndDelete(req.params.id);

    // Set the teachSubject field to null in teachers
    await Teacher.updateOne(
      { teachSubject: deletedSubject._id },
      { $unset: { teachSubject: "" } }
    );

    // Remove the deleted subject from students' examResult array
    await Student.updateMany(
      {},
      { $pull: { examResult: { subName: deletedSubject._id } } }
    );

    // Remove the deleted subject from students' attendance array
    await Student.updateMany(
      {},
      { $pull: { attendance: { subName: deletedSubject._id } } }
    );

    res.send(deletedSubject);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete all subjects for a school
export const deleteSubjects = async (req, res) => {
  try {
    const deletedSubjects = await Subject.deleteMany({ school: req.params.id });

    // Set the teachSubject field to null in teachers
    await Teacher.updateMany(
      { teachSubject: { $in: deletedSubjects.map((subject) => subject._id) } },
      { $unset: { teachSubject: "" } }
    );

    // Set examResult and attendance to null in all students
    await Student.updateMany(
      {},
      { $set: { examResult: null, attendance: null } }
    );

    res.send(deletedSubjects);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete all subjects for a specific class
export const deleteSubjectsByClass = async (req, res) => {
  try {
    const deletedSubjects = await Subject.deleteMany({
      sclassName: req.params.id,
    });

    // Set the teachSubject field to null in teachers
    await Teacher.updateMany(
      { teachSubject: { $in: deletedSubjects.map((subject) => subject._id) } },
      { $unset: { teachSubject: "" } }
    );

    // Set examResult and attendance to null in all students
    await Student.updateMany(
      {},
      { $set: { examResult: null, attendance: null } }
    );

    res.send(deletedSubjects);
  } catch (error) {
    res.status(500).json(error);
  }
};

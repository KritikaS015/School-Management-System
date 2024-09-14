import bcrypt from "bcrypt";
import Admin from "../models/adminSchema.js";
import Sclass from "../models/sclassSchema.js";
import Student from "../models/studentSchema.js";
import Teacher from "../models/teacherSchema.js";
import Subject from "../models/subjectSchema.js";
import Notice from "../models/noticeSchema.js";
import Complain from "../models/complainSchema.js";

// Register Admin
export const adminRegister = async (req, res) => {
  try {
    const admin = new Admin({
      ...req.body,
    });

    const existingAdminByEmail = await Admin.findOne({ email: req.body.email });
    const existingSchool = await Admin.findOne({
      schoolName: req.body.schoolName,
    });

    if (existingAdminByEmail) {
      res.send({ message: "Email already exists" });
    } else if (existingSchool) {
      res.send({ message: "School name already exists" });
    } else {
      let result = await admin.save();
      result.password = undefined;
      res.send(result);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Admin Login
export const adminLogIn = async (req, res) => {
  if (req.body.email && req.body.password) {
    let admin = await Admin.findOne({ email: req.body.email });
    if (admin) {
      if (req.body.password === admin.password) {
        admin.password = undefined;
        res.send(admin);
      } else {
        res.send({ message: "Invalid password" });
      }
    } else {
      res.send({ message: "User not found" });
    }
  } else {
    res.send({ message: "Email and password are required" });
  }
};

// Get Admin Details
export const getAdminDetail = async (req, res) => {
  try {
    let admin = await Admin.findById(req.params.id);
    if (admin) {
      admin.password = undefined;
      res.send(admin);
    } else {
      res.send({ message: "No admin found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Uncomment these methods if needed

// Delete Admin
// export const deleteAdmin = async (req, res) => {
//     try {
//         const result = await Admin.findByIdAndDelete(req.params.id);

//         await Sclass.deleteMany({ school: req.params.id });
//         await Student.deleteMany({ school: req.params.id });
//         await Teacher.deleteMany({ school: req.params.id });
//         await Subject.deleteMany({ school: req.params.id });
//         await Notice.deleteMany({ school: req.params.id });
//         await Complain.deleteMany({ school: req.params.id });

//         res.send(result);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// };

// Update Admin
// export const updateAdmin = async (req, res) => {
//     try {
//         if (req.body.password) {
//             const salt = await bcrypt.genSalt(10);
//             req.body.password = await bcrypt.hash(req.body.password, salt);
//         }
//         let result = await Admin.findByIdAndUpdate(req.params.id,
//             { $set: req.body },
//             { new: true });

//         result.password = undefined;
//         res.send(result);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// };

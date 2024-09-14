import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    subName: {
      type: String,
      required: true,
    },
    subCode: {
      type: String,
      required: true,
    },
    sessions: {
      type: String,
      required: true,
    },
    sclassName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sclass",
      required: true,
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "teacher",
    },
  },
  { timestamps: true }
);

export default mongoose.model("subject", subjectSchema);

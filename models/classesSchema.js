const mongoose = require("mongoose");
const { Schema } = mongoose;

const classesSchema = new Schema({
  classeName: { type: String },
  teacherList: [{ type: mongoose.Schema.Types.ObjectId, ref: "teacher" }],
  studentList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Students" }],
});

module.exports = mongoose.model("classes", classesSchema);

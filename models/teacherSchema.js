const mongoose = require("mongoose");
const { Schema } = mongoose;

const teacherSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  age: { type: Number },
  gender: { type: String },
  subject: { type: String },
  phoneNo: { type: Number },
  adress: { type: String },
  email: { type: String },
  password: { type: String },
  photo: { type: String },
  // adminId:{type:Schema.Types.ObjectId,ref:'admin'}
  listOfFeedBack: [{ type: mongoose.Schema.Types.ObjectId, ref: "TeacherFeedBack"}],
  classId:{ type: mongoose.Schema.Types.ObjectId, ref: "classes"}


});

module.exports = mongoose.model("teacher", teacherSchema);

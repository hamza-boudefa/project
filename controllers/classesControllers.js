const classes = require("../models/classesSchema");
const teacher = require("../models/teacherSchema");
const student = require("../models/studentsSchema");

const addNewClasse = async (req, res) => {
  try {
    const newClasse = new classes(req.body);
    await newClasse.save();
    return res.json({ message: "class added successfully", newClasse });
  } catch (error) {
    return res.json({ message: error });
  }
};

// get class

const getClasse = async (req, res) => {
  try {
    const getClasse = await classes.findById(req.params.id).populate("studentList").populate("teacherList");
    return res.json(getClasse);
  } catch (error) {
    return res.json({ message: error });
  }
};

const getClassesList = async (req, res) => {
  console.log("get classes list");
  try {
    const getClassesList = await classes.find().populate("studentList");
    return res.json(getClassesList);
  } catch (error) {
    return res.json({ message: error });
  }
};

// update

const updateClasse = async (req, res) => {
  try {
    const updateClasse = await classes.findByIdAndUpdate(
      req.params.id,
      { $set: { ...req.body } },
      { new: true }
    );
    await updateClasse.save();
    return res.json({ message: "Classe updated successfully", updateClasse });
  } catch (error) {
    return res.json({ message: error });
  }
};

// delete

const deleteClasse = async (req, res) => {
  try {
    const deleteClasse = await classes.findByIdAndDelete(req.params.id);
    return res.json({ message: "Classe deleted successfully" });
  } catch (error) {
    return res.json({ message: error });
  }
};

//remove student
const removeStudent = async (req, res) => {
  try {
    const pullStd=req.params.studentId
    const removeStudent = await classes.findByIdAndUpdate(req.params.classId, {
      $pull: { studentList: pullStd },
    });
    await removeStudent.save();
    return res.json({
      message: "Student removed. Classe updated successfully",
      updateClasse,
    });
  } catch (error) {
    return res.json({ message: error });
  }
};

// add student
const addStudents = async (req, res) => {
  try {
const pushStd=req.params.studentId
const getClass= await classes.findById(req.params.classId);
if (getClass){
const verStd = getClass.studentList.includes(pushStd);
// array === includes
console.log("pushStd", pushStd)
console.log("ver: ", verStd);
if(verStd){
return res.json({message:"student already exists"})
}else { 
    const addStudent = await classes.findByIdAndUpdate(req.params.classId, {
      $push: { studentList: pushStd },
    });
    await addStudent.save();
    return res.json({
      message: "Student added. Classe updated successfully",
      updateClasse
    });} 
  }

else {
  return res.json({message:"class doesn't exist"})
}
  }
   catch (error) {
    return res.json({ message: error });
  }
};
// remove teacher
const removeTeacher = async (req, res) => {
  try {
    const pullTeacher=req.params.teacherId
    const removeTeacher = await classes.findByIdAndUpdate(req.params.classId, {
      $pull: { teacherList: pullTeacher },
    });
    await removeTeacher.save();
    return res.json({
      message: "teacher removed. Classe updated successfully",
      updateClasse,
    });
  } catch (error) {
    return res.json({ message: error });
  }
};
// add teacher
const addTeachers = async (req, res) => {
    try {
  const pushTeacher=req.params.teacherId
      const addTeacher = await classes.findByIdAndUpdate(req.params.classId, {
        $push: { teacherList:pushTeacher}
      });
      await addTeacher.save();
      return res.json({
        message: "Teacher added. Classe updated successfully",
        updateClasse
      });
    } catch (error) {
      return res.json({ message: error });
    }
  };

module.exports = {
  addNewClasse,
  updateClasse,
  deleteClasse,
  getClasse,
  getClassesList,
  removeStudent,
  removeTeacher,
  addStudents,
  addTeachers
};

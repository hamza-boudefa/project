const teacher = require("../models/teacherSchema");
const admin=require('../models/adminSchema')
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

// add teacher
const addNewTeacher = async (req, res) => {
  try {
    const { email, password } = req.body;
    const verifyTeacher = await teacher.findOne({ email });
    if (verifyTeacher) {
      return res.status(400).json({ message: "teacher already exists" });
    } else {
      const hashed = await bcrypt.hash(password, saltRounds);
      const newTeacher = new teacher({ ...req.body, password: hashed });
      await newTeacher.save();
      await admin.findByIdAndUpdate(req.body.id,{$push:{listOfTeachers:newTeacher}})



      return res.json({ message: "teacher added successfully", newTeacher });
    }
  } catch (error) {
    return res.json({ message: error });
  }
};

// get
const getTeacher = async (req, res) => {
  try {
    const getTeacher = await teacher.findById(req.params.id);
    return res.json(getTeacher);
  } catch (error) {
    return res.json({ message: error });
  }
};

const getTeachersList = async (req, res) => {
  try {
    const getTeachersList = await teacher.find();
    return res.json(getTeachersList);
  } catch (error) {
    return res.json({ message: error });
  }
};

// update

const updateTeacher = async (req, res) => {
  try {
    const updateTeacher = await teacher.findByIdAndUpdate(
      req.params.id,
      { $set: { ...req.body } },
      { new: true }
    );
    await updateTeacher.save();
    return res.json({ message: "teacher updated successfully", updateTeacher });
  } catch (error) {
    return res.json({ message: error });
  }
};

// delete

const deleteTeacher = async (req, res) => {
  try {
    const deleteTeacher = await teacher.findByIdAndDelete(req.params.id);
    return res.json({ message: "teacher deleted successfully" });
  } catch (error) {
    return res.json({ message: error });
  }
};

// login
const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const teacherVer = await teacher.findOne({ email });
    if (!teacherVer) {
      return res.json({ message: "bad credentials" });
    } else {
      const match = await bcrypt.compare(password, teacherVer.password);
      if (!match) {
        return res.json({ message: "bad credentials" });
      } else {
        const token = jwt.sign({ id: teacherVer._id }, process.env.privateKey);
        return res.json({
          message: "teacher loggedin successfully",
          teacherId: teacherVer._id,
          token,
        });
      }
    }
  } catch (error) {
    return res.json({ message: error });
  }
};

module.exports = {
  addNewTeacher,
  getTeacher,
  getTeachersList,
  updateTeacher,
  deleteTeacher,
  logIn,
};

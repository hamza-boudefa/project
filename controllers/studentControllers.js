const students = require("../models/studentsSchema");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const classe=require('../models/classesSchema')

// add student
const addNewStudent = async (req, res) => {
  try {
    const { email, password } = req.body;
    const verifyStudent = await students.findOne({ email });
    if (verifyStudent) {
      return res.status(400).json({ message: "student already exists" });
    } else {
      const hashed = await bcrypt.hash(password, saltRounds);
      const newStudent = new students({ ...req.body, password: hashed });
      await newStudent.save();
      return res.json({ message: "student added successfully", newStudent });
    }
  } catch (error) {
    return res.json({ message: error });
  }
};

// get
const getStudent = async (req, res) => {
  try {
    const getStudent = await students.findById(req.params.id).populate('listOfFeedBack');
    return res.json(getStudent);
  } catch (error) {
    return res.json({ message: error });
  }
};

const getStudentsList = async (req, res) => {
  try {
    const getStudentsList = await students.find().populate('listOfFeedBack');
    return res.json(getStudentsList);
  } catch (error) {
    return res.json({ message: error });
  }
};

// update

const updateStudent = async (req, res) => {
  try {
    const updateStudent = await students.findByIdAndUpdate(
      req.params.id,
      { $set: { ...req.body } },
      { new: true }
    );
    await updateStudent.save();
    return res.json({ message: "student updated successfully", updateStudent });
  } catch (error) {
    return res.json({ message: error });
  }
};

// delete

const deleteStudent = async (req, res) => {
  try {
    const deleteStudent = await students.findByIdAndDelete(req.params.id);
    return res.json({ message: "student deleted successfully" });
  } catch (error) {
    return res.json({ message: error });
  }
};

// login
const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const studentVer = await students.findOne({ email });
    if (!studentVer) {
      return res.json({ message: "bad credentials" });
    } else {
      const match = await bcrypt.compare(password, studentVer.password);
      if (!match) {
        return res.json({ message: "bad credentials" });
      } else {
        const token = jwt.sign({ id: studentVer._id }, process.env.privateKey);
        return res.json({
          message: "student loggedin successfully",
          studentId: studentVer._id,
          token,
        });
      }
    }
  } catch (error) {
    return res.json({ message: error });
  }
};

module.exports = {
  addNewStudent,
  logIn,
  getStudent,
  updateStudent,
  deleteStudent,
  getStudentsList,
};

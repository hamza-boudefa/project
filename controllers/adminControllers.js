const admin = require("../models/adminSchema");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

// add admin
const addAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const adminVer = await admin.findOne({ email });
    if (adminVer) {
      return res.json({ message: "admin already exists" });
    } else {
      const hashed = await bcrypt.hash(password, saltRounds);
      console.log(hashed);
      //   for bson format no need for await
      const newAdmin = new admin({ ...req.body, password: hashed });
      console.log(newAdmin);
      await newAdmin.save();
      return res.json({ message: "admin added successfully", newAdmin });
    }
  } catch (error) {
    return res.json({ message: error });
  }
};

// login
const logInAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const adminVerification = await admin.findOne({ email });
    console.log(adminVerification)
    if (!adminVerification) {
      return res.json({ message: "bad cred1" });
    } else {
      const match = await bcrypt.compare(password, adminVerification.password);
      if (!match) {
        return res.json({ message: "bad cred2" });
      } else {
        const token = jwt.sign(
          { id: adminVerification._id },
          process.env.privateKey
        );
        return res.json({
          message: "admin logged in successfully",
          adminId: adminVerification._id,
          token,
        });
      }
    }
  } catch (error) {
    return res.json({ message: error });
  }
};

// get admin

const getAdmin = async (req, res) => {
  try {
    const getAdmin = await admin.find().populate('listOfTeachers');
    return res.json({ message: getAdmin });
  } catch (error) {
    return res.json({ message: error });
  }
};

// get admin

const getOneAdmin = async (req, res) => {
    try {
      const getAdmin = await admin.findById(req.params.id).populate('listOfTeachers');
      return res.json({ message: getAdmin });
    } catch (error) {
      return res.json({ message: error });
    }
  };
// update

const updateAdmin = async (req, res) => {
  try {
    const updateAdmin = await admin.findByIdAndUpdate(
      req.params.id,
      { $set: { ...req.body } },
      { new: true }
    );
    await updateAdmin.save();
    return res.json({ message: "admin updated successfully", updateAdmin });
  } catch (error) {
    return res.json({ message: error });
  }
};

// delete

const deleteAdmin = async (req, res) => {
  try {
    const deleteAdmin = await admin.findByIdAndDelete(req.params.id);
    return res.json({ message: "admin deleted successfully" });
  } catch (error) {
    return res.json({ message: error });
  }
};
module.exports = { addAdmin, getAdmin,getOneAdmin, deleteAdmin, updateAdmin, logInAdmin };

var jwt = require("jsonwebtoken");
const students = require("../models/studentsSchema");

const studentMiddleware = async (req, res, next) => {
  try {
    const token = req.headers["auth"];
    console.log(token);
    if (!token) {
      return res.json({ message: "no autherized" });
    } else {
      var decoded = jwt.verify(token, process.env.privateKey);
      const studentV = await students.findById(decoded.id);
      if (!studentV) {
        return res.json({ message: "nott autherized" });
      } else {
        next(); 
      } 
    }
  } catch (error) {
    console.log({ message: error });
  }
};

module.exports = studentMiddleware;

var jwt = require("jsonwebtoken");
const teacher = require("../models/teacherSchema");

const teacherMiddleware = async (req, res, next) => {
  try {
    const token = req.headers["auth"];
    console.log(token);
    if (!token) {
      return res.json({ message: "nott autherized" });
    } else {
      var decoded = jwt.verify(token, process.env.privateKey);
      const teacherV = await teacher.findById(decoded.id);
      if (!teacherV) {
        return res.json({ message: "nott autherized" });
      } else {
        next();
      }
    }
  } catch (error) {
    console.log({ message: error });
  }
};

module.exports = teacherMiddleware;

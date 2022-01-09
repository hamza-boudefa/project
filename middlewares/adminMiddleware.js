var jwt = require("jsonwebtoken");
const admin = require("../models/adminSchema");

const adminMiddleware = async (req, res, next) => {
  try {
    const token = req.headers["auth"];
    console.log(token);
    if (!token) {
      return res.json({ message: "notttt autherized" });
    } else {
      var decoded = jwt.verify(token, process.env.privateKey);
      const adminV = await admin.findById(decoded.id);
      if (!adminV) {
        return res.json({ message: "nott autherized" });
      } else {
        next(); 
      } 
    }
  } catch (error) {
    console.log({ message: error });
  }
};

module.exports = adminMiddleware;

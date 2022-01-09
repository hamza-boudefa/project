// await teachers.findByIdAndUpdate(req.body.id,{$push:{listOfProducts:newStudent}})
const posts = require("../models/PostSchema");
const teacher = require("../models/teacherSchema");
const student = require("../models/studentsSchema");

const addNewPost = async (req, res) => {
  try {
    const newPost = new posts(req.body);
    await newPost.save();

    await teacher.findByIdAndUpdate(req.body.authorId, {
      $push: { listOfFeedBack: newPost },
    });
    await student.findByIdAndUpdate(req.body.studentId, {
      $push: { listOfFeedBack: newPost },
    });

    return res.json({ message: "product added successfully", newPost });
  } catch (error) {
    return res.json({ message: error });
  }
};

// update

const updatePost = async (req, res) => {
  try {
    const updatePost = await posts.findByIdAndUpdate(
      req.params.id,
      { $set: { ...req.body } },
      { new: true }
    );
    await updatePost.save();
    return res.json({ message: "Post updated successfully", updatePost });
  } catch (error) {
    return res.json({ message: error });
  }
};

// delete

const deletePost = async (req, res) => {
  try {
    const deletePost = await posts.findByIdAndDelete(req.params.id);
    return res.json({ message: "Post deleted successfully" });
  } catch (error) {
    return res.json({ message: error });
  }
};
module.exports = { addNewPost, updatePost, deletePost };

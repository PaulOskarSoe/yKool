const express = require("express");
const router = express.Router();

const User = require("./../models/User");
const Course = require("./../models/Course");

router.post("/new_course", async (req, res) => {
  const { userId, name, code, description } = req.body;
  if (!req.user) return res.json({ message: "Needs auth", code: 401 });
  if (!name || !code)
    return res.json({ message: "Missing fields: [code, name]", code: 403 });

  // check if user is teacher
  const isTeahcer = await User.findOne({ _id: userId });
  if (isTeahcer && isTeahcer.role !== 1) {
    return res.json({ message: "User has to be a teacher", code: 401 });
  }
  const newCourse = new Course({ name, code, description });
  if (newCourse) {
    newCourse
      .save()
      .then((doc) => {
        return res.json({
          message: "Course saved successfully",
          data: doc,
          code: 200,
        });
      })
      .catch((err) => {
        return res.json({
          message: "Something went wrong",
          data: err,
          code: 400,
        });
      });
  }
});

module.exports = router;

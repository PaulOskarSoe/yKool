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
  const teacher = await User.findOne({ _id: userId });

  if (teacher && teacher.role !== 1) {
    return res.json({ message: "User has to be a teacher", code: 401 });
  }

  const newCourse = new Course({ name, code, description });
  try {
    if (newCourse) {
      await User.updateMany(
        { _id: teacher._id },
        { $push: { courseID: newCourse._id } }
      );
    }
  } catch (error) {}
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

// we map all user courseIDs
// we get all course objects by courseIDs, which are attached to user object
router.get(`/teacher/:userId`, async (req, res) => {
  if (!req.user)
    return res.status(401).json({ message: "Vajab autoriseerimist" });
  try {
    const user = await User.findById(req.params.userId);
    const courses = await Course.find({ _id: { $in: user.courseID } });
    return res.json({ data: courses, code: 200 });
  } catch (error) {
    return res.send(403).json({ error, message: "Midagi läks valesti" });
  }
});

router.get(`/student/:userId`, async (req, res) => {
  if (!req.user)
    return res.stauts(401).json({ message: "Vajab autoriseerimist" });
  try {
    const user = await User.findById(req.params.userId);
    const courses = await Course.find({ _id: { $in: user.courseID } });
    return res.json({ data: courses, code: 200 });
  } catch (error) {
    return res.json({ error, code: 403 });
  }
});

router.delete("/:courseId", async (req, res) => {
  if (!req.user)
    return res.status(401).json({ message: "Vajab autoriseerimist" });

  if (req.user.role !== 1)
    return res
      .status(401)
      .json({ message: "Ainult õpetaja saab kursusi eemaldada" });

  try {
    const deletedCourse = await Course.deleteOne({ _id: req.params.courseId });
    console.log("deleted course: ", deletedCourse);
    return res
      .send(200)
      .json({ message: "Kustustamine oli edukas", data: deletedCourse });
  } catch (error) {
    return res.send(403).json({ error, message: "Midagi läks valesti" });
  }
});

router.post("/request_access", async (req, res) => {
  if (!req.user)
    return res.status(401).json({ message: "Vajab autoriseerimist" });
  const { userId, courseId } = req.body;

  if (!courseId || !userId)
    return res.status(403).json({ message: "Vajalikud väljad on puudu" });

  try {
    const updatedCourse = await Course.update(
      { _id: courseId },
      { $push: { pendingStudendID: userId } }
    );
    if (updatedCourse) return res.status(200).json({ message: "OK" });
  } catch (error) {
    return res.send(403).json({ error, message: "Midagi läks valesti" });
  }
});

router.get("/request_access", async (req, res) => {
  if (!req.user)
    return res.status(401).json({ message: "Vajab autoriseerimist" });

  if (req.user.role !== 1)
    return res
      .status(401)
      .json({ message: "Ainult õpetaja saab kursususele inimesi vastu võtta" });

  const { courseId } = req.body;

  if (!courseId)
    return res.status(403).json({ message: "Vajalikud väljad on puudu" });

  try {
    const courseRequests = await Course.findById(courseId, {
      pendingStudendID: 1,
    });
    if (courseRequests)
      return res.status(200).json({ message: "OK", data: courseRequests });
  } catch (error) {
    return res.send(403).json({ error, message: "Midagi läks valesti" });
  }
});

router.post("/accept/request_access", async (req, res) => {
  if (!req.user)
    return res.status(401).json({ message: "Vajab autoriseerimist" });

  if (req.user.role !== 1)
    return res
      .status(401)
      .json({ message: "Ainult õpetaja saab kursususele inimesi vastu võtta" });

  const { courseId, userId, didAccept } = req.body;

  if (!courseId || !userId)
    return res.status(403).json({ message: "Vajalikud väljad on puudu" });
  try {
    // add student to course
    if (didAccept) {
      await Course.updateOne(
        { _id: courseId },
        { $push: { studentID: userId } }
      );
    }
    // remove student from pending
    await Course.updateOne(
      { _id: courseId },
      { $pull: { pendingStudendID: userId } }
    );

    return res.status(200).json({ message: "OK" });
  } catch (error) {
    return res.send(403).json({ error, message: "Midagi läks valesti" });
  }
});

module.exports = router;

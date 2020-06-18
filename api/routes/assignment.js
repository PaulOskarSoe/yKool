const express = require("express");
const router = express.Router();

const Assignment = require("./../models/Assignment");

// CREATE a new assignment
router.post("/new_assignment", async (req, res) => {
  if (!req.user)
    return res.status(401).json({ message: "Vajab autoriseerimist" });
  if (req.user && req.user.role !== 1) {
    return res.status(401).json({ message: "Kasutaja peab olema õpetaja" });
  }
  const userId = req.user._id;
  const { courseId, description, endDate } = req.body;

  if (!courseId || !userId || !description || !endDate)
    return res.sned(403).json({ message: "Vajalikud väljad on puudu" });

  try {
    const newAssignment = await new Assignment({
      creatorID: userId,
      courseID: courseId,
      description,
      endDate,
    });
    if (newAssignment) {
      newAssignment
        .save()
        .then((doc) => {
          res.status(200);
          return res.json({ message: "OK", data: doc });
        })
        .catch((err) =>
          res.status(400).json({ error: err, message: "Midagi läks valesti" })
        );
    }
  } catch (error) {
    console.log("error while creating an assignment", error);
    return res.status(403).json({ error, message: "Midagi läks valesti" });
  }
});

// DELETE assignment by assignment id
router.delete("/:assignmentId", async (req, res) => {
  if (!req.user)
    return res.status(401).json({ message: "Vajab autoriseerimist" });
  if (req.user && req.user.role !== 1) {
    return res.status(401).json({ message: "Kasutaja peab olema õpetaja" });
  }

  try {
    await Assignment.deleteOne({ _id: req.params.courseId });
    return res
      .status(200)
      .json({ message: "Kustustamine oli edukas", data: deletedCourse });
  } catch (error) {
    return res.status(403).json({ error, message: "Midagi läks valesti" });
  }
});

//GET assignments by courseID

router.get("/:courseId", async (req, res) => {
  if(!req.user._id)
    return res.status(401).json({ message: "Vajab autoriseerimist" });
  try {
    const assignments = await Assignment.find({courseID: req.params.courseId});
    return res.json({data: assignments, code: 200 });
  } catch (error) {
    return res.status(403).json({error, message: "Midagi läks valesti" });
  }
});

module.exports = router;

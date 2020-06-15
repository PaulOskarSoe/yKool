const express = require("express");
const router = express.Router();

const Assignment = require("./../models/Assignment");
const Submission = require("./../models/Submission");

// GET all submissions by assignment id
router.get("/:assignmentId", async (req, res) => {
  if (!req.user)
    return res.sendStatus(401).json({ message: "Vajab autoriseerimist" });

  try {
    const { assignmentId } = req.params.assignmentId;
    const submissions = await Assignment.findById(assignmentId, {
      submissionID: 1,
    });

    if (submissions) {
      res.status(200);
      return res.json({ data: submissions, message: "OK" });
    }
  } catch (error) {
    console.log("error while getting submissions by assignmentId: ", error);
    return res.sendStatus(403).json({ error, message: "Midagi läks valesti" });
  }
});

// CREATE a new submission
router.post("/new_submission", async (req, res) => {
  const userId = req.user._id;
  const { submissionTitle, submissionContent, assignmentId } = req.body;
  console.log("body and userID", userId, submissionTitle, submissionContent);
  // check permissions and for required fields
  if (!req.user)
    return res.sendStatus(401).json({ message: "Vajab autoriseerimist" });
  if (!submissionTitle || !submissionContent || !userId || !assignmentId)
    return res.sendStatus(401).json({ message: "Vajalikud väljad on puudu" });

  const newSubmission = new Submission({
    userID: userId,
    submissionContent,
    submissionTitle,
  });
  try {
    if (newSubmission) {
      newSubmission.save().catch((err) => {
        return res.sendStatus(403).json({
          message: "Midagi läks valesti",
          error: err,
          code: 403,
        });
      });
      // add submissionID to assignment object
      const updatedAssignment = await Assignment.updateOne(
        { _id: assignmentId },
        { $push: { submissionID: newSubmission._id } }
      );
      if (updatedAssignment) {
        res.status(200);
        return res.json({ data: newSubmission, message: "OK" });
      }
    }
  } catch (error) {
    return res.sendStatus(403).json({ error, message: "Midagi läks valesti" });
  }
});

//ACCEPT submission
router.post("/accept/:submissionId", async (req, res) => {
  const { submissionId } = req.params;
  if (!req.user)
    return res.sendStatus(401).json({ message: "Vajab autoriseerimist" });
  if (req.user.role !== 1)
    return res
      .sendStatus(401)
      .json({ message: "Ainult õpetaja saab vastuseid akspeteerida" });
  if (!submissionId) return res.sendStatus(401);
  try {
    // set did accept to true
    const updatedSubmission = await Submission.updateOne(
      { _id: submissionId },
      { $set: { isAccepted: true } }
    );
    if (updatedSubmission) {
      res.status(200);
      return res.json({ message: "Vastus on aksepteeritud" });
    }
  } catch (error) {
    return res.sendStatus(403).json({ message: "Vajalikud väljad on puudu" });
  }
});

module.exports = router;

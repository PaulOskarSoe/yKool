const express = require("express");
const router = express.Router();

const Assignment = require("./../models/Assignment");

router.post("/new_assignment", async (res, req) => {
  if (!req.user)
    return res.status(401).json({ message: "Vajab autoriseerimist" });
  if (teacher && teacher.role !== 1) {
    return res.status(401).json({ message: "Kasutaja peab olema õpetaja" });
  }
  const { userId, courseId, description, endDate } = req.body;

  if (!courseId || !userId || !description || !endDate)
    return res.status(403).json({ message: "Vajalikud väljad on puudu" });

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
          return res.status(200).json({ message: "OK", data: doc });
        })
        .catch((err) =>
          res.status(400).json({ error: err, message: "Midagi läks valesti" })
        );
    }
  } catch (error) {
    console.log("error while creating an assignment", error);
    return res.send(403).json({ error, message: "Midagi läks valesti" });
  }
});

module.exports = router;

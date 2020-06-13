const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  creatorID: { type: String, required: true },
  description: { type: String, required: false },
  endDate: { type: Date, required: false },
  createdAt: { type: Date.now(), required: true },
  submissionID: { type: String, required: false },
  courseID: { type: String },
});

const Assignment = mongoose.model("assignment", assignmentSchema);

module.exports = Assignment;

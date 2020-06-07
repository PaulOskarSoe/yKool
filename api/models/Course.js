const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  description: { type: String, required: false },
  teacherID: [{ type: String, required: true }],
  studentID: [{ type: String, required: false }],
  assignmentID: [{ type: String, required: false }],
  createdAt: { type: Date, default: new Date(), required: true }
});

const Course = mongoose.model("course", courseSchema);

module.exports = Course;

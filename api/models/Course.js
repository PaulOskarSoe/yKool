const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: {type: String, required: true },
  description: { type: String, required: false },
  userID: [{ type: String, required: true }],
  assignmentID:  [{ type: String, required: true }],
  createdAt: { type: Date.now(), required: true }
});

const Course = mongoose.model('course', courseSchema);

module.exports = Course;
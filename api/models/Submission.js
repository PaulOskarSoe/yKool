const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  createdAt: { type: Date.now(), required: true },
});

const Submission = mongoose.model("submission", submissionSchema);

module.exports = Submission;

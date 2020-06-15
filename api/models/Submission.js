const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  submissionTitle: { type: String, required: true },
  submissionContent: { type: String, required: true },
  isAccepted: { type: Boolean, required: true, default: false },
});

const Submission = mongoose.model("submission", submissionSchema);

module.exports = Submission;

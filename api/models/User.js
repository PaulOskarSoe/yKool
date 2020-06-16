const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// ROLES
// 0 -> admin
// 1 -> teacher
// 2 -> student

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  fullName: { type: String, required: true },
  hash: { type: String, required: true },
  role: { type: Number, required: true },
  courseID: [{ type: String }],
  submissionID: [{ type: String }],
});

userSchema.statics.checkPassword = async (email, password) => {
  if (!email) {
    return res.json({ message: "No email", status: 401 });
  }
  const userByEmail = await User.findOne({ email })
    .then((doc) => doc && doc.toObject())
    .catch((err) => console.log(err));
  console.log(userByEmail);
  if (!userByEmail)
    return {
      message: "User not found",
      code: 403,
    };

  const isValidPassword = await bcrypt.compareSync(password, userByEmail.hash);
  if (!isValidPassword) return { message: "Wrong password", code: 401 };
  return { code: 200, user: userByEmail };
};

const User = mongoose.model("user", userSchema);

module.exports = User;

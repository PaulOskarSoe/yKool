const express = require("express");
const router = express.Router();

const User = require("./../models/User");
const bcrypt = require("bcrypt");

router.post("/new_user", async (req, res) => {
  const { email, fullName, role, password } = req.body;
  // check if we have required fields
  if (!email && !fullName && !role && password) {
    console.log("Missing required fields");
    return res.json({ message: "Missing required fields", code: 403 });
  }
  const existingUser = await User.findOne({ fullName });
  if (existingUser) {
    return res.json({ message: "User already exists", code: 403 });
  }
  let passWordHash;
  try {
    passWordHash = await bcrypt.hash(password, 10);
  } catch (error) {
    console.log("there was an error with hashing");
  }

  const user = new User({ email, fullName, role, hash: passWordHash });
  if (user) {
    user
      .save()
      .then((doc) => {
        return res.json({
          message: "User saved successfully",
          data: doc,
          status: 200,
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

module.exports = router;

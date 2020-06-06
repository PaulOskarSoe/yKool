const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const passport = require("passport");
const User = require("./../models/User");

router.post("/new_user", async (req, res) => {
  const { email, fullName, role, password } = req.body;
  // check if we have required fields
  if (!email && !fullName && !role && password) {
    console.log("Missing required fields");
    return res.json({ message: "Missing required fields", code: 403 });
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.json({
      message: "User with this email already exists",
      code: 403,
    });
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

const authenticateUser = function (req, res, next) {
  passport.authenticate(
    "local",
    {
      passReqToCallback: true,
      failWithError: false,
    },
    (error, user, info) => {
      console.log("user", user, error);
      if (error) {
        return res.status(500).json({ msg: "Something broke :/" });
      } else if (!user) {
        return res
          .status((info || {}).code || 404)
          .json({ message: (info || {}).message || "User not found" });
      } else {
        req.login(user, (err) => {
          console.log("error: ", err);
          if (err) return res.status(500).json({ msg: "Login failed" });
          // req.userDoc = user
          return next();
        });
      }
    }
  )(req, res);
};

router.post("/login", authenticateUser, (req, res) => {
  return res.json(req.user);
});
module.exports = router;

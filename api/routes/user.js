const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const passport = require("passport");
const User = require("./../models/User");

router.post("/new_user", async (req, res) => {
  const { email, fullName, role, password } = req.body;
  // check if we have required fields
  if (!email && !fullName && !role && password) {
    return res.status(401).json({ message: "Vajalikud väljad puuduvad" });
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(401).json({
      message: "Selline kasutaja juba eksisteerib",
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
        return res.status(400).json({
          message: "Tekkis viga kasutaja loomisel",
          data: err,
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
      if (error) {
        return res.status(500).json({ msg: "Something broke :/" });
      } else if (!user) {
        return res
          .status((info || {}).code || 404)
          .json({ message: (info || {}).message || "User not found" });
      } else {
        req.login(user, (err) => {
          if (err) return res.status(500).json({ msg: "Login failed" });
          return next();
        });
      }
    }
  )(req, res);
};

router.post("/login", authenticateUser, (req, res) => {
  return res.json(req.user);
});

router.get("/loggedin", (req, res) => {
  const isAuthenticated = req.isAuthenticated();

  if (isAuthenticated && req.user) return res.status(200).json(req.user);
  return res.status(401).json({ message: "You have to log in" });
});

module.exports = router;

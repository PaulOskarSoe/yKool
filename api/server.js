require("dotenv").config();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// init PORT && DB access key
const PORT = process.env.PORT || 8080;
const DB_URL = process.env.DB_ACCESS;

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// API routes
const users = require("./routes/user");
const courses = require("./routes/course");
const assignments = require("./routes/assignment");
const submissions = require("./routes/submission");

// start listening on PORT
const serverConnection = () =>
  app.listen(PORT, () => {
    console.log("API is running on PORT:", PORT);
  });

// connect API with mongoDB
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Database access success!");
    serverConnection();
  })
  .catch((err) => {
    console.log("Database access unsuccessful: ", err);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/users", users);
app.use("/api/v1/courses", courses);
app.use("/api/v1/assignments", assignments);
app.use("/api/v1/submissions", submissions);

app.use(passport.initialize());
app.use(passport.session());
// Add the line below, which you're missing:

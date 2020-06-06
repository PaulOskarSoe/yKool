require("dotenv").config();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

const User = require("./models/User");

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

//passport middleware
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    function (username, password, next) {
      User.checkPassword(username, password)
        .then((result = {}) => {
          const user = result.user;
          if (result.code !== 200)
            return next(null, false, {
              message: result.msg,
              code: result.code || 500,
            });
          else {
            console.log("user in middleware: ", user);
            return next(null, user);
          }
        })
        .catch((err) => {
          console.log(`Auth error: ${err}`);
          return next(null, false, {
            message: "Something workn't, sry :/",
            code: 500,
          });
        });
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

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

app.use(
  session({
    name: "yKoolCookie",
    secret: "afhgvkjhbecrehgker",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1/users", users);
app.use("/api/v1/courses", courses);
app.use("/api/v1/assignments", assignments);
app.use("/api/v1/submissions", submissions);

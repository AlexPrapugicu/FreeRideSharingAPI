const express = require("express");
const passport = require("passport");
// const cookieSession = require("cookie-session");
const app = express();
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const connectToDatabase = require("./src/config/database.config");
const UserRoutes = require("./src/routes/userRoutes");

connectToDatabase();
app.use(morgan("dev"));
app.use(cors());
app.use(passport.initialize());

// app.use(
//   cookieSession({
//     name: "carRideSharing-session",
//     keys: ["key1", "key2"],
//   })
// );
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", UserRoutes);

app.get("/api", (req, res, next) => {
  return res.status(200).json({ message: "Home page" });
});

app.use(function (req, res, next) {
  return res.status(404).json({ message: "Route not found!" });
});
module.exports = app;

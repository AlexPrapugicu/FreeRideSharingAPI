const express = require("express");
const passport = require("passport");
const app = express();
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const connectToDatabase = require("./src/config/database.config");
const UserRoutes = require("./src/routes/userRoutes");
const { Mongoose } = require("mongoose");

connectToDatabase();
Mongoose.promise = global.Promise;
app.use(morgan("dev"));
app.use(cors());
// app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/users", UserRoutes);

app.get("/api", (req, res, next) => {
  return res.status(200).json({ message: "Home page" });
});

app.use(function (req, res, next) {
  return res.status(404).json({ message: "Route not found!" });
});
module.exports = app;

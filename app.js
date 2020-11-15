const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const connectToDatabase = require("./src/config/database.config");
const UserService = require("./src/services/UserService");

connectToDatabase();
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(async (req, res, next) => {
  try {
    const user = await UserService.createUser(
      "alex",
      "ion",
      "alex@gmail.com",
      "0745678901",
      "1234"
    );
    res.status(200).json({ message: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});
module.exports = app;

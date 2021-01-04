const mongoose = require("mongoose");
const chalk = require("chalk");

const url =
  "mongodb+srv://alex:sashalex72@smachs.t5lme.mongodb.net/FreeRideSharing?retryWrites=true&w=majority";

const connectToDatabase = () => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(
      console.log(chalk.keyword("orange")("Connected to MongoDB database!"))
    )
    .catch((error) => {
      console.log(error);
    });
};

module.exports = connectToDatabase;

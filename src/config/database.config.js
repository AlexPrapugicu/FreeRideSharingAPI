const mongoose = require("mongoose");
const chalk = require("chalk");

const url =
  "mongodb+srv://" +
  process.env.MONGO_USER +
  ":" +
  process.env.MONGO_PASSWORD +
  "@smachs.t5lme.mongodb.net/" +
  process.env.MONGO_COLLECTION +
  "?retryWrites=true&w=majority";

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

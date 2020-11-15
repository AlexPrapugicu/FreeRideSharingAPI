const mongoose = require("mongoose");
const {
  emailValidator,
  phoneValidator,
} = require("../validators/user/userValidator");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, validate: emailValidator },
  phoneNumber: { type: String, required: true, validate: phoneValidator },
  password: { type: String, required: true },
  username: { type: String },
  address: { type: String },
  role: { type: String, default: "client", enum: ["driver", "client"] },
  token: { type: String },
  cid: { type: String },
  userScore: { type: Number },
  image: { type: String },
});

// Introduce custom query methods

// pre save method

// post save method

module.exports = User = mongoose.model("user", userSchema);

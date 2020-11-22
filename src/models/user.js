const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const pointSchema = require("./location");

const {
  emailValidator,
  phoneValidator,
} = require("../validators/user/userValidator");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, validate: emailValidator },
  phoneNumber: { type: String, validate: phoneValidator },
  password: { type: String, required: true },
  username: { type: String },
  address: { type: String },
  role: { type: String, default: "client", enum: ["driver", "client"] },
  token: { type: String },
  cid: { type: String },
  userScore: { type: Number },
  image: { type: String },
  location: {
    type: pointSchema,
  },
});
userSchema.index({ location: "2dsphere" });
userSchema.query.byName = function (name) {
  return this.findOne({ name: name });
};
userSchema.query.byEmail = function (email) {
  return this.findOne({ email: email });
};
userSchema.query.byUsername = function (username) {
  return this.findOne({ username: username });
};
userSchema.query.byAddress = function (address) {
  return this.findOne({ address: address });
};
userSchema.query.byPhone = function (phoneNumber) {
  return this.findOne({ phoneNumber: phoneNumber });
};
userSchema.query.byCID = function (cid) {
  return this.findOne({ cid: cid });
};

userSchema.pre("save", async function (next) {
  const foundUser = await this.constructor.findOne({
    name: this.name,
    surname: this.surname,
  });
  const foundEmail = await this.constructor.findOne({ email: this.email });

  if (foundEmail || foundUser) {
    // split into two separate error checks and introduce custom error handling
    const err = new Error("already exists!");
    return next(err);
  }
  next();
});

userSchema.methods.isValidPass = async (password) => {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};
// Introduce custom query methods

// pre save method

// post save method

module.exports = User = mongoose.model("user", userSchema);

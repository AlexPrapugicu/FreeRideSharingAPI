const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const pointSchema = require("./location");

const {
  emailValidator,
  phoneValidator,
} = require("../validators/user/userValidator");

const userSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true }, // all google facebook local have these
    surname: { type: String, required: true }, // all google facebook local have these
    email: { type: String, required: true, validate: emailValidator }, // all google facebook local have these
    phoneNumber: { type: String, validate: phoneValidator },
    password: { type: String, required: true }, // will fail if login/register with social => default password to : 1Lollipop when facebook/google auth
    username: { type: String },
    address: { type: String },
    emailVerified: { type: Boolean },
    active: { type: Boolean },
    role: { type: String, default: "client", enum: ["driver", "client"] },
    token: { type: String }, // jwt / facebook / google
    cid: { type: String }, // identity card id
    userScore: { type: Number },
    image: { type: String },
    car: [{ type: mongoose.Schema.Types.ObjectId, ref: "car" }],
    age: { type: Number },
    location: {
      type: pointSchema,
    },
    method: {
      type: String,
      enum: ["local", "google", "facebook"],
      required: true,
    }, // sets when logs/registers to further check if any more info is requried to do an action
    facebook: {
      id: String,
      token: String,
      email: String,
      name: String,
    },
    google: {
      id: String,
      token: String,
      email: String,
    },
  },
  { timestamps: true }
);
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

userSchema.methods.isValidPass = async function (password) {
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

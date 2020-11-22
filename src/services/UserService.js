const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { use } = require("passport");

// Deal with basic CRUD operations
// Create
// READ
// UPDATE
// DELETE

/*

  Scenario: 

  User >>>>> 

  User logs in / registers -> create account / login
  
  User has a profile to manage -> there's where he updates his info 

  User can delete his own account under some circumstances

  User can recieve emails from us with the help of nodemailer

  User has its own data enncrypted in our database so everything is safe

  User has the option to change his password on a different route of update database 
  where he should send his current password 

  Admin >>>>>

  Can get all users

  Can delete users

  Can update user info

  Can track users

*/

const getToken = (req) => {
  if (req.headers && req.headers.authorization) {
    return req.headers.authorization;
  }
};
const retrieveUserFromToken = async (req) => {
  try {
    const token = getToken(req);
    const decoded = jwt.decode(token, { complete: true });
    const name = await decoded.payload.iss.toString();
    return name;
  } catch (error) {
    throw error;
  }
};

// exports.getAccess = (action, resource) => {
//     return async function (req, res, next) {
//         try {
//             const name = await retrieveUserFromToken(req);
//             await User.findOne({ name: name }).exec();
//         } catch (error) {
//             next(error);
//         }
//     }
// };

exports.generateToken = (name, id) => {
  const hour = 3600000; // one hour in miliseconds
  return jwt.sign(
    {
      iss: name,
      sub: id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getTime() + 24 * hour),
    },
    process.env.JWT_SECRET
  );
};

exports.createUser = async (name, surname, email, password) => {
  try {
    const hashed = await bcrypt.hash(password, 12);
    const user = new User({
      _id: mongoose.Types.ObjectId(),
      name: name,
      surname: surname,
      email: email,
      phoneNumber: "0220000000",
      password: hashed,
      location: null,
      username: "",
      address: "",
      role: "client",
      token: "",
      cid: "",
      userScore: 0,
      image: "",
    });
    const jwt_token = this.generateToken(name, user._id);
    user.token = jwt_token;

    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};
exports.getAllUsers = async () => {
  try {
    const users = await User.find().exec();
    return users;
  } catch (error) {
    throw error;
  }
};

exports.getUser = async (query) => {
  try {
    const user = await User.findOne(query).exec();
    if (!user) {
      throw new Error("User not found!");
    }
    return user;
  } catch (error) {
    throw error;
  }
};

exports.updateUser = async () => {};
exports.deleteUser = async () => {};
exports.getUserLocation = async () => {};

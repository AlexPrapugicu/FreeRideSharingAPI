const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    "myFancySecret404"
  );
};

exports.createUser = async (
  name,
  surname,
  email,
  password,
  age,
  role = "client",
  method = "local",
  facebook = null,
  google = null
) => {
  try {
    const hashed = await bcrypt.hash(password, 12);
    const user = new User({
      _id: mongoose.Types.ObjectId(),
      name: name,
      surname: surname,
      email: email,
      phoneNumber: "unset",
      password: hashed,
      username: "unset",
      address: "unset",
      emailVerified: false,
      active: false,
      role: role,
      token: "unset",
      cid: "unset",
      userScore: 0,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/1200px-User_font_awesome.svg.png",
      car: [],
      age: age,
      location: null,
      method: method,
      facebook: facebook,
      google: google,
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
    const user = await User.findOne(query)
      .populate("car", "id owner model year plate fuel color")
      .exec();
    if (!user) {
      throw new Error("User not found!");
    }
    return user;
  } catch (error) {
    throw error;
  }
};

exports.updatetoken = async (query) => {
  // the query is the user's email
  try {
    const user = await User.findOne(query)
      .populate("car", "id owner model year plate fuel color")
      .exec();
    const newToken = this.generateToken(user.name, user._id);
    const response = await User.findOneAndUpdate(
      { _id: user._id },
      { $set: { token: newToken } },
      { new: true }
    ).populate("car", "id owner model year plate fuel color");
    return response;
  } catch (error) {}
};

exports.updateUser = async (query, method) => {
  try {
    const updatedUser = await User.findOneAndUpdate(query, method, {
      new: true,
    }).populate("car");
    return updatedUser;
  } catch (error) {
    throw error;
  }
};
exports.deleteUser = async () => {};
exports.getUserLocation = async () => {};

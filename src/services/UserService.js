const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { use } = require("passport");

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

exports.createUser = async (
  name,
  surname,
  email,
  phoneNumber,
  password,
  username = "",
  address = "",
  role = "client",
  cid = "",
  userScore = 0,
  image = ""
) => {
  const hashed = await bcrypt.hash(password, 12);
  const ID = new mongoose.Types.ObjectId();
  const jwt_token = this.generateToken(name, ID);
  const user = new User({
    _id: ID,
    name: name,
    surname: surname,
    email: email,
    phoneNumber: phoneNumber,
    password: hashed,
    username: username,
    address: address,
    role: role,
    token: jwt_token,
    cid: cid,
    userScore: userScore,
    image: image,
  });
  await user.save();
  return user;
};

exports.getUser = async (query) => {
  try {
    const user = await User.findOne(query).exec();
  } catch (error) {
    throw error;
  }
};

const { json } = require("body-parser");
const UserService = require("../services/UserService");

const getUsers = async (req, res, next) => {
  try {
    const users = await UserService.getAllUsers();
    return res.status(200).json({ length: users.length, users: users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

const register = async (req, res, next) => {
  const { name, surname, email, password } = req.body;
  try {
    const user = await UserService.createUser(name, surname, email, password);
    return res.status(201).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

module.exports = {
  getUsers,
  register,
  login,
};

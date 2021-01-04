const { json } = require("body-parser");
const UserService = require("../services/UserService");
const CarService = require("../services/CarService");

const getUserCars = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userCars = await UserService.getUser({ email: email });
    const cars = userCars.car;
    console.log(cars);
    return res.status(200).json(cars);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const addUserCar = async (req, res, next) => {
  const { owner, model, year, plate, color, fuel } = req.body;
  try {
    const user = await UserService.getUser({ email: owner });
    const car = await CarService.addCar(owner, model, year, plate, color, fuel);
    const updated = await UserService.updateUser(
      { email: owner },
      { $push: { car: car } }
    );
    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await UserService.getAllUsers();
    return res.status(200).json({ length: users.length, users: users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

const getUser = async (req, res, next) => {
  const { userEmail } = req.params;
  console.log("getting params as : ", req.params);
  try {
    const user = await UserService.getUser({ email: userEmail });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

const register = async (req, res, next) => {
  const { name, surname, email, password, age, role } = req.body;
  try {
    const user = await UserService.createUser(
      name,
      surname,
      email,
      password,
      age,
      role
    );
    return res.status(201).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await UserService.updatetoken({ email: email });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

const googleLogin = async (req, res, next) => {
  const { user } = req;
  try {
    res.status(200).json({ user: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

const updateUser = async (req, res, next) => {
  const { userEmail } = req.params;
  const updateOps = {};
  console.log(req.body);
  for (const key in req.body) {
    updateOps[key] = req.body[key];
  }
  try {
    const updated = await UserService.updateUser(
      { email: userEmail },
      { $set: updateOps }
    );
    console.log(updated);
    return res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

const uploadImage = async (req, res, next) => {
  const { userEmail } = req.params;
  console.log(req.file);
  try {
    await UserService.getUser({ email: userEmail });
    await UserService.updateUser(
      { email: userEmail },
      { $set: { image: req.file.path } }
    );
    return res.status(200).json("Image uploaded!");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

module.exports = {
  getUsers,
  getUser,
  addUserCar,
  getUserCars,
  register,
  login,
  googleLogin,
  updateUser,
  uploadImage,
};

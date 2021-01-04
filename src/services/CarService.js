const mongoose = require("mongoose");
const Car = require("../models/car");
const UserService = require("../services/UserService");

/*

    Only CRUD operations for now ? 

*/

exports.addCar = async (owner, model, year, plate, fuel, color) => {
  const user = await UserService.getUser({ email: owner });
  try {
    const car = new Car({
      _id: mongoose.Types.ObjectId(),
      owner: user,
      model: model,
      year: year,
      plate: plate,
      fuel: fuel,
      color: color,
    });
    await car.save();
    return car;
  } catch (error) {
    throw error;
  }
};
exports.updateCar = async () => {
  try {
  } catch (error) {
    throw error;
  }
};
exports.deleteCar = async () => {
  try {
  } catch (error) {
    throw error;
  }
};
exports.viewCar = async () => {
  try {
  } catch (error) {
    throw error;
  }
};

const mongoose = require("mongoose");
const { carPlateValidator } = require("../validators/car/carValidator");

const carSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  model: { type: String, default: "" },
  year: { type: String, default: "" },
  plate: {
    type: String,
    default: "XX 000 YYY",
    required: true,
    validator: carPlateValidator,
  },
  fuel: { type: String },
  color: { type: String, default: "" },
  image: { type: String, default: "" },
});

module.exports = mongoose.model("car", carSchema);

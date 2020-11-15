const mongoose = require("mongoose");
const { carPlateValidator } = require("../validators/car/carValidator");
const carSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  model: { type: String, default: "" },
  year: { type: Number, default: 0 },
  plate: {
    type: String,
    default: "XX 000 YYY",
    required: true,
    validator: carPlateValidator,
  },
  color: { type: String, default: "" },
  image: { type: String },
});

module.exports = mongoose.model("car", carSchema);

const mongoose = require("mongoose");

const carSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  model: { type: String, default: "" },
  year: { type: Number, default: 0 },
  plate: { type: String, default: "XX 000 YYY", required: true },
  color: { type: String, default: "" },
  image: { type: String },
});

module.exports = mongoose.model("car", carSchema);

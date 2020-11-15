const mongoose = require("mongoose");

const rideSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  driver: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  clients: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  car: { type: mongoose.Schema.Types.ObjectId, ref: "car" },
  pickupPoint: { type: String, default: "" },
  destination: { type: String, default: "" },
  departureTime: { type: Date, default: Date.now },
  arrivalTime: { type: Date, default: "" },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "ongoing", "finished"],
  },
  distance: { type: String, default: "0 km" },
  avgSpeed: { type: String, default: "0 km/h" },
});

module.exports = mongoose.model("ride", rideSchema);

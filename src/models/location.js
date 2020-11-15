const mongoose = require("mongoose");

const polygonSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Polygon"],
    required: true,
  },
  coordinates: {
    type: [[[Number]]], // Array of arrays of arrays of numbers
    required: true,
  },
});

const pointSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
  radius: {
    type: Number,
    required: true,
  },
});

module.exports = {
  pointSchema,
  polygonSchema,
};

const { plateRegex } = require("../regex");

exports.carPlateValidator = (plate) => {
  if (plate && plate.match(plateRegex)) {
    return true;
  }
  return false;
};

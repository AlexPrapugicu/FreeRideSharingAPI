const { emailRegex, phoneRegex } = require("../regex");

const emailValidator = (email) => {
  if (email && email.match(emailRegex)) {
    return true;
  }
  return false;
};

const phoneValidator = (phoneNr) => {
  if (phoneNr && phoneNr.match(phoneRegex)) {
    return true;
  }
  return false;
};

module.exports = {
  emailValidator,
  phoneValidator,
};

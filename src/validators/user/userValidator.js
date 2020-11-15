const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\s|\.|\-)?([0-9]{3}(\s|\.|\-|)){2}$/;
const emailValidator = (email) => {
  if (email && email.match(emailRegex)) {
    return true;
  }
  return false;
};

const phoneValidator = (phoneNr) => {
  if (phoneNr && phoneNr.match(phoneRegex)) {
    console.log(phoneNr + " MATHCEAD");
    return true;
  }
  console.log(phoneNr + " NO MATCHED");
  return false;
};

module.exports = {
  emailValidator,
  phoneValidator,
};

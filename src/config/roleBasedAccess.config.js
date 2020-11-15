const ac = require("accesscontrol");
const AccessControl = new ac();

exports.roles = () => {
  AccessControl.grant("user")
    .readOwn("profile")
    .deleteOwn("profile")
    .createOwn("profile")
    .grant("admin")
    .extend("user")
    .updateAny("profile")
    .deleteAny("profile")
    .readAny("profile");
  return AccessControl;
};

const express = require("express");
const passport = require("passport");
const router = express.Router();
const UserController = require("../controllers/UserController");
const passportConfiguration = require("../config/passport.config");
const upload = require("../services/fileStorageService");

const passportGoogle = passport.authenticate("google", {
  session: false,
});
router.get("/", UserController.getUsers);
router.get("/user/cars/:userEmail", UserController.getUserCars);
router.post("/user/addCar", UserController.addUserCar);
router.get("/user/:userEmail", UserController.getUser);
router.post("/register", UserController.register);
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  UserController.login
);

router.post(
  "/user/upload/:userEmail",
  upload.single("image"),
  (req, res, next) => {
    console.log(req.params);
    UserController.uploadImage(req, res, next);
  }
);
router.patch("/user/:userEmail", UserController.updateUser);

router.post("/google", passportGoogle, UserController.googleLogin);

module.exports = router;

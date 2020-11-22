const express = require("express");
const passport = require("passport");
const router = express.Router();
const UserController = require("../controllers/UserController");
require("../config/passport.config");

router.get("/", UserController.getUsers);
router.post("/register", UserController.register);

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  function (req, res) {
    // Successful authentication, redirect home.
    return res.redirect("/good");
  }
);
router.get("/failed", (req, res) => res.send("You Failed to log in!"));
router.get("/good", isLoggedIn, (req, res) => {
  return res.status(200).json({
    name: req.user.displayName,
    pic: req.user.photos[0].value,
    email: req.user.emails[0].value,
  });
});

module.exports = router;

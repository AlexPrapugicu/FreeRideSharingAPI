const passport = require("passport");
const GoogleTokenStrategy = require("passport-google-plus-token");
const JWTStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook");
const GoogleStrategy = require("passport-google-oauth2");
const { ExtractJwt } = require("passport-jwt");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const UserService = require("../services/UserService");

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: "JWTKEY",
    },
    async (payload, done) => {
      try {
        // if user doesnt exist -> handle
        const user = await User.findById(payload.sub);
        if (!user) {
          return done(null, false);
        }
        //else if exists
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      secretOrKey: "JWTKEY",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false);
        }
        const matched = await user.isValidPass(password);
        if (!matched) {
          console.log("Password didn't match");
          return done(null, false);
        }
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

passport.use(
  "google",
  new GoogleTokenStrategy(
    {
      clientID:
        "724721538887-4tqqu43r35sn99bajs4a9kl01p7e17th.apps.googleusercontent.com",
      clientSecret: "5EC3lDmnGAjciCJkK88aGEty",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // console.log("profile", profile.displayName, "profile");
        // console.log("accessToken", accessToken, "accessToken");
        // console.log("\refreshToken", refreshToken, "\refreshToken");

        // Should check :
        // user has already registered with google (google only or linked google account -> return that user )
        const existingGoogleUser = await User.findOne({
          "google.id": profile.id,
        });
        if (existingGoogleUser) {
          // console.log(existingGoogleUser);
          return done(null, existingGoogleUser);
        }
        // user has not linked google account -> check if we have a user with this email in the database like
        // jonDoe@gmail.com already is in our database as local -> link his account aka findOneAndUpdate google fields
        const sameEmailUser = await User.findOne({ email: profile.email });
        if (sameEmailUser) {
          const updatedSameEmailUser = await User.findOneAndUpdate(
            { email: profile.email },
            {
              $set: {
                method: "google",
                "google.id": profile.id,
                "google.email": profile.emails[0].value,
                "google.token": accessToken,
              },
            },
            { new: true }
          );
          // console.log(updatedSameEmailUser);
          return done(null, updatedSameEmailUser);
        }

        const newUser = await UserService.createUser(
          profile.name.familyName,
          profile.name.givenName,
          profile.emails[0].value,
          "1Lollipop",
          "google", // method
          null, // facebook
          {
            id: profile.id,
            email: profile.emails[0].value,
            token: accessToken,
          }
        );
        // console.log(newUser);
        return done(null, newUser);
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);

const passport = require("passport");
const mongoose = require("mongoose");
const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(async function (username, password, done) {
    let result = await User.findOne(
      { username: username, password: password },
   
      {
        username: 1,
        type: 1,
        address:1
      }
    );
    console.log("PASSPORT USER CREATION/LOGIN");
    console.log(result);
    if (result) done(null, result);
    else done(null, false);
  })
);
passport.serializeUser((user, done) => {
  console.log("serialize");
  done(null, user);
});
passport.deserializeUser(async (user, done) => {
  console.log("deserialize");

  done(null, user);
});

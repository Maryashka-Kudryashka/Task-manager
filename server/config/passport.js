const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const db = require("../db");
const ObjectId = require('mongodb').ObjectId;

module.exports = () => {
  passport.use(new Strategy(
    async function(email, password, cb) {
      console.log("passport")
      const user = await db
                        .get()
                        .collection("users")
                        .findOne({ email: email })

      if (!user) { return cb(null, false) }

      if (user.password !== password) { 
        return cb(null, false);
      }

      return cb(null, user);
  }));

  passport.serializeUser(function(user, cb) {
    cb(null, user._id);
  });
  
  passport.deserializeUser(async function(id, cb) {
    const user = await db.get().collection("users")
                  .findOne({ _id: ObjectId(id) });
  
    if (!user) return cb(new Error('deserialize error'));
  
    return cb(null, user);
  });
};

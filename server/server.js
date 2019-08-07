const express = require("express");
const db = require("./db");
const task = require("./routes/task");
const auth = require("./routes/auth");
const app = express();
const bodyParser = require("body-parser");
const url = "mongodb+srv://admin:adminpassword@cluster0-zbie4.mongodb.net/test?retryWrites=true&w=majority";
const configPassport = require("./config/passport");
var passport = require("passport");
const expressSession = require("express-session");
const settings = require("./config/settings");

module.exports.start = function(done) {
  configPassport()
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(expressSession(({ secret: 'randomSecret', resave: false, saveUninitialized: false })));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use("/task", task);
  app.use("/auth", auth);
  db.connect(url, err => {
    if (err) {
      console.log("Unable to connect to Mongo.", err);
      process.exit(1);
    } else {
      console.log("Connected successfully to server");
    }
  });

  app
    .listen(settings.port, function() {
      console.log("Listening on port " + settings.port);

      if (done) {
        return done(null, app);
      }
    })
    .on("error", function(e) {
      if (e.code == "EADDRINUSE") {
        console.log("Address in use. Is the server already running?");
      }
      if (done) {
        return done(e);
      }
    });
};

module.exports.start();

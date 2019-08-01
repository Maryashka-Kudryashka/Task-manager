const express = require("express");
const db = require("./db");
const task = require("./routes/task");
const auth = require("./routes/auth");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const url = "mongodb://localhost:27017/taskDB";
const configPassport = require("./config/passport");
var passport = require("passport");
const expressSession = require("express-session");
const settings = require("./config/settings");

module.exports.start = function(done) {

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "frontendURL");
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  app.use(
    expressSession({
      secret: "keyboard cat",
      cookie: {
        secure: true
      },
      resave: false,
      saveUninitialized: false
    })
  );

  configPassport()
  app.use(cors());


  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));


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

const express = require('express'),
  router = express.Router(),
  ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn,
  passport = require('passport');

const stripUser = (req, res, next) => {
  const user = req.user
  delete user.password;
  req.user = user;
  next();
};

router.post('/login', 
  passport.authenticate('local'),
  stripUser,
  function (req, res) {
    console.log("hello", req.user)
    res.send({ user: req.user, status: 'OK' });
  }
);

router.post('/logout', function (req, res) {
  req.logout();
  res.send(({status: 'OK'}));
});

router.post('/signup',
  passport.authenticate('local-signup'),
  stripUser,
  function (req, res) {
    res.send({ user: req.user, status: 'OK' });
  }
);

router.get('/getCurrentUser',
  ensureLoggedIn(),
  stripUser,
  function (req, res) {
    res.send({ user: req.user, status: 'OK' });
  }
);

module.exports = router;


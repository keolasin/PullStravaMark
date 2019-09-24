const express = require("express");
const router = express.Router();
const passport = require('passport');

router.get("/users/sign_in", (req, res) => {
  res.render('users/sign_in');
});

router.get('/users/sign_in/strava', passport.authenticate('strava'));

router.get('/return',
  passport.authenticate('strava', {failureRedirect: '/users/sign_in'}),
  function(req, res){
    res.redirect('/');
  }
);

module.exports = router;

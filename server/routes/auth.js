'use strict';

const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const { JWT_SECRET, JWT_EXPIRY } = require('../config');
const jwtAuth = passport.authenticate('jwt', {
  session: false,
  failWithError: true
});

function createAuthToken(user) {
  return jwt.sign({ user }, JWT_SECRET, {
    subject: user.username,
    expiresIn: JWT_EXPIRY
  });
}

const router = express.Router();

// Github Redirect
router.get('/github', passport.authenticate('github'));

// Github Callback
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    // yay! authentication successful
    // TODO: redirect with token?
    const token = createAuthToken(req.user);
    res.redirect(`/login/code?=${token}`);
  })

// Refresh JWT token
router.post('/refresh', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({ authToken });
});

module.exports = router;

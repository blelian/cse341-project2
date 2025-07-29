const express = require('express');
const passport = require('passport');
const isLoggedIn = require('../middleware/isLoggedIn');

const router = express.Router();

// Route to start Google OAuth login
router.get('/google',
  passport.authenticate('google', { 
    scope: ['profile', 'email'],
    prompt: 'select_account'  // Force account selection each time
  })
);

// OAuth2 callback
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/auth/dashboard'); // Redirect to dashboard after login
  }
);

// 🔐 Protected Dashboard Route
router.get('/dashboard', isLoggedIn, (req, res) => {
  res.send(`Welcome, Admin ${req.user.displayName}`);
});

// Logout
router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    req.session.destroy(err => {
      if (err) return next(err);
      res.clearCookie('connect.sid'); // Clear session cookie
      res.send('You have been logged out.');
    });
  });
});

module.exports = router;

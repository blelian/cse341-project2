const passport = require('passport');

// Initiate Google OAuth login
const login = passport.authenticate('google', {
  scope: ['profile', 'email'],
});

// Handle the callback after Google has authenticated the user
const callback = passport.authenticate('google', {
  failureRedirect: '/',
  successRedirect: '/dashboard', // Change this to the page you want after login
});

// Logout
const logout = (req, res) => {
  req.logout(err => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ message: 'Error during logout' });
    }
    res.redirect('/');
  });
};

module.exports = {
  login,
  callback,
  logout,
};

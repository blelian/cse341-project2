// middleware/isLoggedIn.js
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json({ message: "Unauthorized. Please log in with Google." });
  }
}

module.exports = isLoggedIn;

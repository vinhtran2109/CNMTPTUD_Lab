// Middleware to check if user is authenticated
const requireAuth = (req, res, next) => {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.redirect('/login');
  }
};

// Middleware to check if user is already logged in
const redirectIfAuth = (req, res, next) => {
  if (req.session && req.session.userId) {
    res.redirect('/');
  } else {
    next();
  }
};

module.exports = { requireAuth, redirectIfAuth };

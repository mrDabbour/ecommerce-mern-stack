const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    // Check if the user has the required role
    if (req.user.role === 'admin' || req.user.role === 'user') {
      return next();
    }
    return res.status(403).json({ error: 'Forbidden - Insufficient privileges' });
  }
  res.status(401).json({ error: 'Unauthorized' });
};

module.exports = {
  isLoggedIn,
};

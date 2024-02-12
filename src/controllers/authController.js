const passport = require('passport');
const User = require('../models/User');

const register = (req, res) => {
  const { username, email, password, role } = req.body;

  // Only allow 'admin' to set the role during registration
  const allowedRoles = ['admin'];
  const userRole = allowedRoles.includes(role) ? role : 'user';

  User.register(new User({ username, email, role: userRole }), password)
    .then(() => {
      // Manually log in the user after registration
      passport.authenticate('local')(req, res, () => {
        res.json({ success: true, message: 'Registration successful', user: req.user });
      });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ success: false, message: 'Registration failed' });
    });
};



const login = (req, res) => {
  res.json({ success: true, message: 'Login successful', user: req.user });
};

const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Logout failed' });
    }
    res.json({ success: true, message: 'Logout successful' });
  });
};


module.exports = {
  register,
  login,
  logout,
};

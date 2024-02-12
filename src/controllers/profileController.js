// controllers/profileController.js
exports.getProfile = (req, res) => {
    // Logic for getting a user's profile
    res.json({ success: true, message: 'Profile retrieved', user: req.user });
  };
  
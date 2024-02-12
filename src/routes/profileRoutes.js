// profileRoutes.js
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');

// Get profile route (protected route requiring authentication)
router.get('/', authMiddleware.isLoggedIn, profileController.getProfile);

// Add other profile routes as needed

module.exports = router;

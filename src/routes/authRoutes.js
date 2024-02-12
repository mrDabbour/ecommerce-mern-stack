// routes/authRoutes.js
const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/authController');

// Register route
router.post('/register', authController.register);

// Login route
router.post('/login', passport.authenticate('local'), authController.login);

// Logout route
router.get('/logout', authController.logout);



module.exports = router;

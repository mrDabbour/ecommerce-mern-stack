const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to get all users
router.get('/users', userController.getAllUsers);
// Route to get a single user by ID
router.get('/users/:userId', userController.getSingleUser);

// Create user route
router.post('/user', userController.createUser);

// Update user route
router.put('/user/:id', userController.updateUser);

module.exports = router;

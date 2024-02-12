const User = require('../models/User');

// Controller to get all users
exports.getAllUsers = async (req, res) => {
  try {
    console.log('Attempting to get users...');
    const users = await User.find();
    console.log('Users retrieved successfully:', users);
    res.json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ success: false, message: 'Error getting users' });
  }
};


// Controller to get a single user by ID
exports.getSingleUser = async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId);
      
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      res.json(user);
    } catch (error) {
      console.error('Error getting user:', error);
      res.status(500).json({ success: false, message: 'Error getting user' });
    }
  };

  exports.createUser = (req, res) => {
    // Logic for creating a user
    res.json({ success: true, message: 'User created successfully', user: req.body });
  };
  
  exports.updateUser = (req, res) => {
    // Logic for updating a user
    res.json({ success: true, message: 'User updated successfully', user: req.body });
  };
  
var express = require('express');
const { getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/User');
var router = express.Router();

// Create new user -> moved to auth route

// Get all users
router.get('/',getAllUsers);
// Get user by id
router.get('/:id',getUserById);
// Update user
router.patch('/:id', updateUser);
// Delete user
router.delete('/:id', deleteUser);

module.exports = router;

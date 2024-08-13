var express = require('express');
const { getAllUsers, createUser, getUserById } = require('../controllers/User');
var router = express.Router();

// Create new user
router.post('/',createUser);
// Get all users
router.get('/',getAllUsers);
// Get user by id
router.get('/:id',getUserById);

module.exports = router;

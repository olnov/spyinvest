var express = require('express');
const AuthenticationController = require('../controllers/authController');
const { createUser } = require('../controllers/User');
var router = express.Router();

// Create new token
router.post('/',AuthenticationController.createToken);
// Register new user
router.post('/register/', createUser);

module.exports = router;

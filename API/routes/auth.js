var express = require('express');
const AuthenticationController = require('../controllers/authController');
const UserController = require('../controllers/User');
var router = express.Router();

// Create new token
router.post('/',AuthenticationController.createToken);


module.exports = router;

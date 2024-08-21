var express = require('express');
const { uploadProfileImage, getProfileImage } = require('../controllers/profileImages');
var router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// Upload profile image
router.post('/:id/upload', upload.single('photo'), uploadProfileImage);
// Get profile image
router.get('/:id', getProfileImage);

module.exports = router;
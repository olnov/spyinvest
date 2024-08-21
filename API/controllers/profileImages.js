const AWS = require('aws-sdk');
require('dotenv').config();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/User');  
const upload = multer({ storage: multer.memoryStorage() });

// Set up the S3 client for iDrive E2 (compatible with S3)
const s3 = new AWS.S3({
    endpoint: new AWS.Endpoint('https://r4f4.ldn.idrivee2-45.com'),
    accessKeyId: process.env.IDRIVE_E2_ACCESS_KEY,
    secretAccessKey: process.env.IDRIVE_E2_SECRET_KEY,
    region: 'London',
    s3ForcePathStyle: true,
});

// Controller function to upload profile image and update user record
exports.uploadProfileImage = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if a file is provided
        if (!req.file) {
            return res.status(400).json({ message: '[USERS-013] No file uploaded' });
        }

        // Generate a unique filename
        const filename = `${uuidv4()}-${req.file.originalname}`;

        // Find the user by ID
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: '[USERS-007] User not found' });
        }

        // Upload the image to S3
        const uploadResult = await s3.upload({
            Bucket: 'profiles', // Replace with your bucket name
            Key: `images/${filename}`, // Folder path within the bucket
            Body: req.file.buffer, // The image buffer
            ContentType: req.file.mimetype, // Set the content type for the image
            ACL: 'public-read', // Make the file publicly accessible (optional, depends on your needs)
        }).promise();

        // Store only the image URL in the PostgreSQL database
        await user.update({
            photo: uploadResult.Location,
        });

        res.status(200).json({ message: 'Image updated successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Can't upload image", error: error.message });
    }
};


exports.getProfileImage = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the user by ID
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: '[USERS-007] User not found' });
        }

        // Check if the user has a profile image
        if (!user.photo) {
            return res.status(404).json({ message: '[USERS-014] Profile image not found' });
        }

        // Respond with the image URL
        res.status(200).json({
            message: 'Profile image retrieved successfully!',
            imageUrl: user.photo, // This is the S3 URL of the image
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Can't retrieve profile image", error: error.message });
    }
};
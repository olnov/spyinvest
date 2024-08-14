const express = require('express');
const { getAllAssets, createAsset, getAssetById } = require('../controllers/Assets');
const router = express.Router();

// Get all assets
router.get('/', getAllAssets);
// Create new asset
router.post('/',createAsset);
// Get asset by id
router.get('/:id',getAssetById);

module.exports = router;


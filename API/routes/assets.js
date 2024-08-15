const express = require('express');
const { getAllAssets, createAsset, getAssetById, updateAsset, deleteAsset } = require('../controllers/Assets');
const router = express.Router();

// Get all assets
router.get('/', getAllAssets);
// Create new asset
router.post('/',createAsset);
// Get asset by id
router.get('/:id',getAssetById);
// Update asset
router.patch('/:id',updateAsset);
// Delete asset
router.delete('/:id', deleteAsset);

module.exports = router;


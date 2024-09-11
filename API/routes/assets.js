const express = require('express');
const { getAllAssets, createAsset, getAssetById, updateAsset, deleteAsset, getAssetByDescription } = require('../controllers/Assets');
const router = express.Router();

// Get all assets
router.get('/', getAllAssets);
// Get asset by partial description match
router.post('/description', getAssetByDescription);
// Create new asset
router.post('/',createAsset);
// Get asset by id
router.get('/:id',getAssetById);
// Update asset
router.patch('/:id',updateAsset);
// Delete asset
router.delete('/:id', deleteAsset);


module.exports = router;


const express = require('express');
const { createPortfolioAssets, getAllPortfolioAssets, updatePortfolioAssetById, deletePortfolioAssetById } = require('../controllers/PortfolioAssets');
const router = express.Router();

// Create new PortfolioAssets
router.post('/',createPortfolioAssets);
// Get all PortfolioAssets
router.get('/',getAllPortfolioAssets);
// Update PortfolioAssets
router.patch('/:id',updatePortfolioAssetById);
// Delete PortfolioAssets
router.delete('/:id',deletePortfolioAssetById);

module.exports = router;
const express = require('express');
const { createPortfolioAssets, getAllPortfolioAssets, updatePortfolioAssetById, deletePortfolioAssetById, getPortfolioAssetsByPortfolioId } = require('../controllers/portfolioAssets');
const router = express.Router();
const assetChecker = require('../middleware/assetChecker');
// Create new PortfolioAssets
router.post('/',assetChecker, createPortfolioAssets);
// Get all PortfolioAssets
router.get('/',getAllPortfolioAssets);

// Get PortfolioAssets by portfolio id
router.get('/:portfolio_id',getPortfolioAssetsByPortfolioId);

// Update PortfolioAssets
router.patch('/:id',updatePortfolioAssetById);
// Delete PortfolioAssets
router.delete('/:id',deletePortfolioAssetById);

module.exports = router;
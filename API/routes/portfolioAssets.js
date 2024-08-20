const express = require('express');
const { createPortfolioAssets, getAllPortfolioAssets, updatePortfolioAssetById, deletePortfolioAssetById, getUserPortfolioAssets } = require('../controllers/PortfolioAssets');
const router = express.Router();

// Create new PortfolioAssets
router.post('/',createPortfolioAssets);
// Get all PortfolioAssets
router.get('/',getAllPortfolioAssets);
// Get user's portfolios and assets
router.get('/user/user_id',getUserPortfolioAssets);
// Update PortfolioAssets
router.patch('/:id',updatePortfolioAssetById);
// Delete PortfolioAssets
router.delete('/:id',deletePortfolioAssetById);

module.exports = router;
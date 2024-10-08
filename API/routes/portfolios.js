const express = require('express');
const { createPortfolio, getAllPortfolios, getPortfoliosByUserId, getPortfolioById, updatePortfolio, deletePortfolio } = require('../controllers/Portfolios');
const router = express.Router();

// Create new portfolio
router.post('/',createPortfolio);
// Get all portfolios
router.get('/',getPortfoliosByUserId);
// Get portfolio by id
router.get('/:id',getPortfolioById);
// Update portfolio
router.patch('/:id',updatePortfolio);
// Delete portfolio
router.delete('/:id', deletePortfolio);


module.exports = router;
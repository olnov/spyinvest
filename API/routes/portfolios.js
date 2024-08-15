const express = require('express');
const { createPortfolio, getAllPortfolios } = require('../controllers/Portfolios');
const router = express.Router();

// Create new portfolio
router.post('/',createPortfolio);

// Get all portfolios
router.get('/',getAllPortfolios);

module.exports = router;
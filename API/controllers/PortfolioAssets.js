const PortfolioAsset = require('../models/PortfolioAssets');
const Portfolio = require('../models/Portfolio');
const Asset = require('../models/Asset');
const User = require('../models/User'); 

// Create new PortfolioAssets

exports.createPortfolioAssets = async (req,res) => {
    try {
        const { 
            portfolio_id, 
            asset_id,
            date_purchase,
            date_sell,
            quantity_purchase,
            quantiy_sell,
            buying_price,
            selling_price
        } = req.body;
        const newPortfolioAssets = await PortfolioAsset.create({
            portfolio_id, 
            asset_id,
            date_purchase,
            date_sell,
            quantity_purchase,
            quantiy_sell,
            buying_price,
            selling_price,
            created_at: new Date(),
        });
        res.status(201).json({ message: "[PA-001] Created successfully:",newPortfolioAssets});
    }catch(error){
        res.status(500).json({ message: "[PA-002] Can't create PortfolioAssets:", error:error.message});
    }
}

// Get all PortfolioAssets
exports.getAllPortfolioAssets = async (req, res) => {
    try {
        const portfolioAssets = await PortfolioAsset.findAll({
            include: [
                {
                    model: Portfolio,
                    attributes: ['title', 'description']
                },
                {
                    model: Asset,
                    attributes: ['asset']
                }
            ]
        });
        res.status(200).json(portfolioAssets);
    } catch (error) {
        res.status(500).json({ message: "Error fetching portfolio assets", error: error.message });
    }
};

// Update PortfolioAssets
exports.updatePortfolioAssetById = async (req, res) => {
    try {
        const { id } = req.params;
        const { date_purchase, date_sell, quantity_purchase, quantity_sell, price_buy, price_sell } = req.body;

        const portfolioAsset = await PortfolioAsset.findOne({ where: { id } });

        if (!portfolioAsset) {
            return res.status(404).json({ message: "Portfolio asset not found" });
        }

        await portfolioAsset.update({
            date_purchase: date_purchase || portfolioAsset.date_purchase,
            date_sell: date_sell || portfolioAsset.date_sell,
            quantity_purchase: quantity_purchase || portfolioAsset.quantity_purchase,
            quantity_sell: quantity_sell || portfolioAsset.quantity_sell,
            price_buy: price_buy || portfolioAsset.price_buy,
            price_sell: price_sell || portfolioAsset.price_sell,
        });

        res.status(200).json({ message: "Portfolio asset updated successfully", portfolioAsset });
    } catch (error) {
        res.status(500).json({ message: "Error updating portfolio asset", error: error.message });
    }
};

// Delete PortfolioAssets
exports.deletePortfolioAssetById = async (req, res) => {
    try {
        const { id } = req.params;

        const portfolioAsset = await PortfolioAsset.findOne({ where: { id } });

        if (!portfolioAsset) {
            return res.status(404).json({ message: "Portfolio asset not found" });
        }

        await portfolioAsset.destroy();

        res.status(200).json({ message: "Portfolio asset deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting portfolio asset", error: error.message });
    }
};

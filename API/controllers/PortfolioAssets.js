const PortfolioAsset = require('../models/PortfolioAssets');
const Portfolio = require('../models/Portfolio');
const Asset = require('../models/Asset');
const User = require('../models/User'); 
const datetimeformat = require('../helpers/datetimeformat');

// Create new PortfolioAssets

exports.createPortfolioAssets = async (req,res) => {
    // currently issue with unique constraint on portfolio_id and asset_id
    // I've added a helper function if there's an issue adding date to the database
    try {
        const newPortfolioAssets = await PortfolioAsset.create({
            portfolio_id : req.body.portfolio_id,
            asset_id : req.asset_id,
            date_purchase :(req.body.date_purchased),
            date_sell : (req.body.date_sell),
            quantity_purchase : req.body.quantity,
            quantity_sell : req.body.quantity_sell,
            price_buy : req.body.buying_price,
            price_sell: req.body.selling_price,
            created_at: new Date(),
        });
        res.status(201).json({ message: "[PA-001] Created successfully:",newPortfolioAssets});
    }catch(error){
        console.log(error);
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
                },
            ]
        });
        const portfolioAssetsWithDetails = portfolioAssets.map(portfolioAsset => ({
            portfolio_id: portfolioAsset.portfolio_id,
            asset_name: portfolioAsset.Asset.asset,
            date_purchase: (portfolioAsset.date_purchase),
            date_sell: portfolioAsset.date_sell,
            quantity_purchase: portfolioAsset.quantity_purchase,
            quantity_sell: portfolioAsset.quantity_sell,
            price_buy: portfolioAsset.price_buy,
            price_sell: portfolioAsset.price_sell,
        }));

        res.status(200).json(portfolioAssetsWithDetails);
    } catch (error) {
        res.status(500).json({ message: "Error fetching portfolio assets", error: error.message });
    }
};

// Get PortfolioAsset by UserId
exports.getPortfolioAssetsByUserId = async (req, res) => {
    const userId = req.user_id;
    try {
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const portfolios = await Portfolio.findAll({ where: { user_id: userId } });
        const portfolioIds = portfolios.map(portfolio => portfolio.id);
        const portfolioAssets = await PortfolioAsset.findAll({
            where: { portfolio_id: portfolioIds },
            include: [
                {
                    model: Portfolio,
                    attributes: ['title', 'description']
                },
                {
                    model: Asset,
                    attributes: ['asset', 'description']
                },
            ]

        });

        const portfolioAssetsWithDetails = portfolioAssets.map(portfolioAsset => ({
            portfolio_id: portfolioAsset.portfolio_id,
            symbol: portfolioAsset.Asset.asset,
            asset_name: portfolioAsset.Asset.description,
            date_purchase: portfolioAsset.date_purchase,
            date_sell: portfolioAsset.date_sell,
            quantity_purchase: portfolioAsset.quantity_purchase,
            quantity_sell: portfolioAsset.quantity_sell,
            price_buy: portfolioAsset.price_buy,
            price_sell: portfolioAsset.price_sell,
        }));

        res.status(200).json(portfolioAssetsWithDetails);
    } catch (error) {
        res.status(500).json({ message: "Error fetching portfolio assets", error: error.message });
    }
};



// Get PortfolioAssets by PortfolioId
exports.getPortfolioAssetsByPortfolioId = async (req, res) => {
    try {
        const { portfolio_id } = req.params;
        const portfolioAssets = await PortfolioAsset.findAll({
            where: { portfolio_id },
            include: [
                {
                    model: Portfolio,
                    attributes: ['title', 'description']
                },
                {
                    model: Asset,
                    attributes: ['asset']
                },
            ]
        });
        const portfolioAssetsWithDetails = portfolioAssets.map(portfolioAsset => ({
            portfolio_id: portfolioAsset.portfolio_id,
            asset_name: portfolioAsset.Asset.asset,
            date_purchase: portfolioAsset.date_purchase,
            date_sell: portfolioAsset.date_sell || null,
            quantity_purchase: portfolioAsset.quantity_purchase,
            quantity_sell: portfolioAsset.quantity_sell,
            price_buy: portfolioAsset.price_buy,
            price_sell: portfolioAsset.price_sell,
        }));

        res.status(200).json(portfolioAssetsWithDetails);
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
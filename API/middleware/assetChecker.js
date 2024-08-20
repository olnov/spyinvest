const Asset = require("../models/Asset");

// Middleware function to check for existing assets in the database
const assetChecker = async (req, res, next) => {
    try {
        const reqAsset = req.body.asset_symbol;
        // Await the result of the database query
        const asset = await Asset.findOne({ where: { asset: reqAsset } });
        
        if (asset) {
            // Add the asset ID to the req object.
            req.asset_id = asset.id;
            next();
        } else {
            res.status(404).json({ message: "Asset not found" });
            // TODO ON FE - when you get this response enable the user to manually fill the asset form?
        }
    } catch (error) {
        console.error('Error in assetChecker: ', error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = assetChecker;

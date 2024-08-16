const JWT = require("jsonwebtoken");
const Asset = require("../models/Asset");
const { createAsset } = require("../controllers/Assets");

// Middleware function to check for valid tokens
const assetChecker = (req, res, next) => {
    const asset_name = req.body.asset_name;
    if (Asset.findOne({ where: { asset_name: asset_name } })) {
        next();
    }
    else {
        // const asset = api.fetch;//tbc//
    }   
}
module.exports = assetChecker;
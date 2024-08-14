const Asset = require('../models/Asset');

// Create a new asset

exports.createAsset = async (req,res) => {
    try {
        const { asset } = req.body;
        // Making sure the asset is unique
        const existingAsset = await Asset.findOne({ where: { asset: asset } });
        if (!existingAsset) {
            const newAsset = await Asset.create({asset});
            res.status(201).json({ message: '[ASSETS-001] Asset created successfully', asset: newAsset});
        } else {
            res.status(409).json({ message: '[ASSETS-002] Asset already exists'});
        }
    } catch(error) {
        res.status(500).json({ message: "[ASSETS-003] Can't create an asset:", error: error.message});
        console.log(error);
    }
};

// List all assets

exports.getAllAssets = async (req,res) => {
    try {
        const assets = await Asset.findAll();
        res.status(200).json(assets);
    } catch(error){
        res.status(500).json({ message:"[ASSETS-004] Can't retreive assets:", error: error});
    }
}


// Get asset by id

exports.getAssetById = async (req,res) => {
    const { id } = req.params;
    try {
        const asset = await Asset.findByPk(id);
        res.status(200).json(asset);
    } catch(error){
        res.status(500).json({ message:"[ASSETS-004] Can't retreive assets:", error: error});
    }
}
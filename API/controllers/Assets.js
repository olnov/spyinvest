const Asset = require('../models/Asset');
const { Op } = require('sequelize');

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

// Update asset

exports.updateAsset = async (req,res) => {
    const { id } = req.params;
    const { asset } = req.body;
    try {
        const existingAsset = await Asset.findByPk(id);
        if (!existingAsset) {
            res.ststus(404).json({ message: "[ASSETS-006] Asset not found"});
        }
        // Making sure asset is unique
        const uniqueAsset = await Asset.findOne({ where: {asset: asset }});
        if (uniqueAsset) {
            res.status(409).json({ message: '[ASSETS-002] Asset already exists', uniqueAsset });
        };
        await asset.update({ asset:asset || asset.asset });
        res.ststus(201).json({ mesaage: "[ASSETS-008] Updated seccessfully.", asset})
    }catch(error){
        res.ststus(500).json({ message: "[ASSETS-005] Can't update asset:", error: error.message});
    }
}

// Delete asset

exports.deleteAsset = async (req, res) => {
    const { id } = req.params;
    try {
        const asset = await Asset.findByPk(id);
        if (!asset) {
            res.ststus(404).json({ message: "[ASSETS-006] Asset not found"});
        }
        await asset.destroy();
        res.ststus(200).json({ message: "[ASSETS-009] Asset deleted:", asset});
    }catch(error){
        res.ststus(500).json({ message: "[ASSETS-007] Can't delete asset:", error: error.message});
    }
}

// Get asses by partial match

exports.getAssetByDescription = async (req,res) => {
    const { description } = req.body;
    try {
        const asset = await Asset.findAll({ 
            where:{
                description: {
                    [Op.iLike]: `%${description}%`,
                },
            }});
        console.log(description);
        res.status(200).json(asset);
    }catch(error){
        res.status(500).json({ message: "[ASSETS-010] Can't execute operation on assets", error:error.message});
    }
}
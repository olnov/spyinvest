const Portfolio = require('../models/Portfolio');
const User = require('../models/User'); 

// Create a new portfolio
exports.createPortfolio = async (req,res) => {
    try {
        const {title, description, user_id } = req.body;
        const newPortfolio = await Portfolio.create({
            title,
            description,
            user_id,
            created_at: new Date(),
        });
        // Check if the user exists
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ message: "[PORTFOLIOS-004] User not found" });
        }
        res.status(201).json({ message: "[PORTFOLIOS-001] Portfolio successfully created: ", newPortfolio });
    }catch(error){
        res.status(500).json({ message: "[PORTFOLIOS-002] Can't create portfolio: ", error: error.message});
    }
};

// Get all portfolios

exports.getAllPortfolios = async (req, res) => {
    try {
        const allPortfolios = await Portfolio.findAll({
            include: [{
                model: User,
                attributes: ['name', 'surname'], 
            }]
        });

        // Modify the response structure to include the user data
        const portfoliosWithUserDetails = allPortfolios.map(portfolio => ({
            title: portfolio.title,
            description: portfolio.description,
            user_id: portfolio.user_id,
            name: portfolio.User.name, 
            surname: portfolio.User.surname,
            created_at: portfolio.created_at,
        }));

        res.status(200).json(portfoliosWithUserDetails);
    } catch (error) {
        res.status(500).json({ message: "[PORTFOLIOS-003] Can't execute the request:", error: error.message });
    }
};

// Get protfolio by user id

exports.getPortfoliosByUserId = async (req,res) => {
    try {
        const { user_id } = req.params;
        const { limit } = req.query;
        const portfolios = await Portfolio.findAll({ 
            where: {user_id:user_id},
            include: [{
                model: User,
                attributes: ['name','surname'],
            }],
            limit: limit,
        });
        const userPortfolios = portfolios.map(portfolio => ({
            title: portfolio.title,
            description: portfolio.description,
            user_id: portfolio.user_id,
            name: portfolio.User.name, 
            surname: portfolio.User.surname,
            created_at: portfolio.created_at,
        }));
        res.status(200).json(userPortfolios);
    } catch(error) {
        res.status(500).json({ message: "[PORTFOLIOS-003] Can't execute the request:", error: error.message });
    }
}

// Get protfolio by id

exports.getPortfolioById = async (req,res) => {
    try {
        const { id } = req.params;
        const portfolio = await Portfolio.findOne({ 
            where: {id},
            include: [{
                model: User,
                attributes: ['name','surname'],
            }],
        });
        if (!portfolio) {
            return res.status(404).json({ message: "[PORTFOLIOS-005] Portfolio not found" });
        }
        const portfolioWithUserDetails = {
            id: portfolio.id,
            title: portfolio.title,
            description: portfolio.description,
            user_id: portfolio.user_id,
            name: portfolio.User.name,
            surname: portfolio.User.surname,
            created_at: portfolio.created_at,
        };
        res.status(200).json(portfolioWithUserDetails);
    } catch(error) {
        res.status(500).json({ message: "[PORTFOLIOS-003] Can't execute the request:", error: error.message });
    }
}

// Update portfolio
exports.updatePortfolio = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, user_id } = req.body;
        const portfolio = await Portfolio.findOne({
            where: { id },
        });
        if (!portfolio) {
            return res.status(404).json({ message: "[PORTFOLIOS-005] Portfolio not found" });
        }
        await portfolio.update({
            title: title || portfolio.title,
            description: description || portfolio.description,
            user_id: user_id || portfolio.user_id,
        });
        res.status(201).json({
            message: "[PORTFOLIOS-006] Portfolio updated successfully",
            portfolio,
        });
    } catch (error) {
        res.status(500).json({ message: "[PORTFOLIOS-007] Error updating portfolio", error: error.message });
    }
};

// Delete portfolio
exports.deletePortfolio = async (req,res) => {
    try {
        const { id } = req.params;
        const portfolio = await Portfolio.findByPk(id);
        if (!portfolio) {
            return res.status(404).json({ message: "[PORTFOLIOS-005] Portfolio not found" });
        }
        await portfolio.destroy();
        res.status(200).json({ message: "[PORTFOLIOS-009] Portfolio deleted:", portfolio});
    }catch(error){
        res.status(500).json({ message: "[PORTFOLIOS-008] Error deleting portfolio", error: error.message }); 
    }
}
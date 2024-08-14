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
            return res.status(404).json({ message: "[PORTFOLIOS-003] User not found" });
        }
        res.status(201).json({ message: "[PORTFOLIOS-001] Protfolio successfully create", newPortfolio });
    }catch(error){
        res.status(500).json({ message: "[PORTFOLIOS-002] Can't crreate portfolio: ", error: error.message});
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
            user_name: portfolio.User.name, 
            user_surname: portfolio.User.surname,
            created_at: portfolio.created_at,
        }));

        res.status(200).json(portfoliosWithUserDetails);
    } catch (error) {
        res.status(500).json({ message: "[PORTFOLIOS-003] Can't execute the request:", error: error.message });
    }
};

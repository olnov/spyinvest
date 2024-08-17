const User = require("../models/User");
const { generateToken } = require("../lib/token");

const createToken = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ where: {email: email}});
//   to modify the code to use 
  const isMatch = await user.comparePassword(password); //Comparing password with hash from DB
  if (!user) {
    console.log("Auth Error: User not found");
    res.status(401).json({ message: "User not found" });
  } else if (!isMatch) {
    console.log("Password in form: "+ password);
    console.log("Auth Error: Passwords do not match")
    res.status(401).json({ message: "Password incorrect" });
  } else {
    const token = generateToken(user.id);
    res.status(201).json({ token: token, userId: user.id });
  }
};

const AuthenticationController = {
  createToken: createToken,
};

module.exports = AuthenticationController;
const User = require('../models/User'); 

// Create a new user
exports.createUser = async (req, res) => {
  const { name, surname, email, password, gender, birth_date } = req.body;
  const exisingEmail = await User.findOne({ where: {email: email }});
  if (exisingEmail) {
    res.status(409).json({ message: '[USERS-012] Email already exists', exisingEmail });
    
  } else {
  try { 
    const newUser = await User.create({
      name,
      surname,
      email,
      password, 
      gender,
      birth_date,
      registred_at: new Date(), 
    });
    res.status(201).json({ message: '[USERS-001] User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: '[USERS-002] Error creating user', error: error.message });
  }
};
}

// Retrieve all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: '[USERS-003] Error fetching users', error: error.message });
  }
};

// Retrieve a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: '[USERS-004] User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: '[USERS-005] Error fetching user', error: error.message });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, surname, email, password, gender, birth_date, terms } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: '[USERS-007] User not found' });
    }
     // Making sure the email is unique
     if (email) {
        const exisingEmail = await User.findOne({ where: {email: email }});
        if (exisingEmail) {
          return res.status(409).json({ message: '[USERS-012] Email already exists', exisingEmail });
        };
     }
    await user.update({
      name: name || user.name,
      surname: surname || user.surname,
      email: email || user.email,
      password: password || user.password, 
      gender: gender || user.gender,
      birth_date:birth_date || user.birth_date,
      terms_accepted: terms || user.terms,
    });
    res.status(200).json({ message: '[USERS-008] User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: '[USERS-009] Error updating user', error: error.message });
    console.log(error);
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: '[USERS-004] User not found' });
    }
    await user.destroy();
    res.status(200).json({ message: '[USERS-010] User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: '[USERS-011] Error deleting user', error: error.message });
  }
};

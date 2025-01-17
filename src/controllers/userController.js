const { registerUser, loginUser } = require('../services/userService');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await registerUser({ name, email, password });
    res.status(201).json({ message: 'User registered successfully!', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { user, token } = await loginUser({ email, password });
    res.json({ message: 'Login successful!', user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { register, login };

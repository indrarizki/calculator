const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const verifyToken = require('./verifyToken');
const User = require('../models/User');
const LoginTime = require('../models/LoginTime');

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Password Wrong!!' });
    }
    const login = new LoginTime({ userId: user._id, loginTime: new Date() });
    await login.save();

    const loginId = login._id;
    const token = jwt.sign({ userId: user._id, loginId, user }, 'secret_key');
    res.json({ token,loginId, user });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/logout', async (req, res) => {
  try {
    const {logId} = req.body;
    const login = await LoginTime.findByIdAndUpdate(logId);

    if (!login) {
      return res.status(401).json({ message: 'User not logged in' });
    }

    login.logoutTime = new Date();
    await login.save();

    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/calcuator', verifyToken, (req, res) => {
  res.json({ message: 'Welcome to the calculator!' , user: req.user});
});

module.exports = router;
const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Route to register a new user
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user already exists
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).send('User already exists');
        }

        // Create a new user
        user = new User({ username, password });
        await user.save();

        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).send('Unauthorized');
  }
  const token = jwt.sign({ id: user._id, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
});

module.exports = router;

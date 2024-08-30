const express = require('express');
const User = require('../models/User');
const authenticateAdmin = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', authenticateAdmin, async (req, res) => {
    try {
        const { username, password } = req.body;

        // Ensure the username isn't 'admin' (or any other predefined admin username)
        if (username.toLowerCase() === 'admin') {
            return res.status(400).send('Cannot register with this username.');
        }

        // Check if the user already exists
        let user = await User.findOne({ username });
        if (user) return res.status(400).send('User already exists');

        // Create a new user
        user = new User({ username, password });
        await user.save();

        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(500).send('Server error');
    }
});

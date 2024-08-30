const express = require('express');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        // Find the admin by username
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(401).send('Unauthorized: Admin not found');
        }

        // Compare the entered password with the stored hash
        const isPasswordValid = await admin.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).send('Unauthorized: Invalid password');
        }

        // Generate a JWT token
        const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return res.json({ token });
    } catch (error) {
        console.error('Error during admin login:', error);
        return res.status(500).send('Internal Server Error');
    }
});

module.exports = router;

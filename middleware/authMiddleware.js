const jwt = require('jsonwebtoken');

// Middleware to verify the token and check if the user is an admin
function authenticateAdmin(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        if (verified.role !== 'admin') return res.status(403).send('Forbidden');
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
}

module.exports = authenticateAdmin;

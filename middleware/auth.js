const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');
    // This is only going to pertain for protected routes that we choose to protect
    // Check if not token
    if(!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;
        next();

    } catch(err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}
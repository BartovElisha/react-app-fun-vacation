const jwt = require('jsonwebtoken');
const config = require('../config/dev');

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. go to /signin');

    try {
        req.token = jwt.verify(token, config.jwt_token);
        next();
    }
    catch (err) {
        console.log(err);
        res.status(401).send('Access denied. go to /signin');
    }
}
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Get token from headers
    const token = req.header('Authorization')?.split(' ')[1]; // Split to get the token part
    console.log(token);
    
    // Check if token is not provided
    if (!token) return res.status(401).send('Access Denied');

    // Verify token
    jwt.verify(token, process.env.TOKEN_SECRET, (err, verified) => {
        if (err) return res.status(403).send('Invalid Token');
        req.user = verified; // Attach the user information to the request
        next(); // Continue to the next middleware or route handler
    });
};

module.exports = authMiddleware;

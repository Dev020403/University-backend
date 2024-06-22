const jwt = require('jsonwebtoken');

const generateToken = (userId, username) => {
    return jwt.sign(
        { userId, username },
        'your_secret_key_here',
        { expiresIn: '1h' }
    );
};
const verifyToken = async (req, res, next) => {
    const bearerToken = req.headers.authorization;
    token = bearerToken.split(' ')[1];
    console.log(token)
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, 'your_secret_key_here');

        if (decoded) {
            req.user = decoded;
            next();
        } else {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(500).json({ message: 'Failed to authenticate token' });
    }
};

module.exports = {
    generateToken,
    verifyToken
};

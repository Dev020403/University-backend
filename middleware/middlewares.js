const jwt = require('jsonwebtoken');

const generateToken = (userId, username) => {
    return jwt.sign(
        { userId, username },
        process.env.JWT_SECRET,
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
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

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

const authorizeRole = (roles) => {
    return (req, res, next) => {
        const role = req.headers.role;

        if (!roles.includes(role)) {
            return res.status(403).json({ message: 'Forbidden: You do not have permission to access this resource' });
        }

        next();
    };
};

module.exports = authorizeRole;


module.exports = {
    generateToken,
    verifyToken,
    authorizeRole
};

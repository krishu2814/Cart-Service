const JWT = require('jsonwebtoken');
const { SECRET_TOKEN } = require('../config/serverConfig');

const isAuthenticUser = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        // console.log(authHeader);

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: 'Authorization header is missing',
                data: {},
                err: {}
            });
        }
        
        // correct format check
        if (!authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token format',
                data: {},
                err: {}
            });
        }

        const token = authHeader.split(' ')[1];
        // console.log(token);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token is missing',
                data: {},
                err: {}
            });
        }

        // verify safely
        // console.log("Secret token",SECRET_TOKEN);
        const decodedToken = JWT.verify(token, SECRET_TOKEN);
        // console.log(decodedToken);
        
        // attach user
        req.user = {
            id: decodedToken.id || decodedToken.userId || decodedToken._id,
            userId: decodedToken.id || decodedToken.userId || decodedToken._id,
            _id: decodedToken.id || decodedToken.userId || decodedToken._id,
            email: decodedToken.email,
            role: decodedToken.role
        };

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token',
            data: {},
            err: error.message
        });
    }
};

module.exports = isAuthenticUser;

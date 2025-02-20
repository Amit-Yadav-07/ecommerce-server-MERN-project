const user = require('../models/userModel');
const JWT = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes')
const { UnauthenticatedError } = require('../errors');

const auth = (req, res, next) => {

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'no token provided' })
    }
    const token = authHeader.split(' ')[1]

    try {
        const payload = JWT.verify(token, process.env.JWT_SECRET);
        // console.log(payload);
        req.user = { userId: payload.userId, name: payload.name, role: payload.role }

        next();

    } catch (error) {
        console.log(error);
    }
}

const isAdmin = async (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'this route is accessible only for admin' });
    }
    next();
}

module.exports = { auth, isAdmin };
const UserModel = require('../models/userModel')
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');



const Register = async (req, res) => {
    const { name, email, number, password } = req.body;

    if (!name || !email || !number || !password) {
        return res.status(StatusCodes.BAD_GATEWAY).send({ msg: 'please provide values' })
    }

    const user = await UserModel.findOne({ email })
    if (user) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'email already exist' })
    }

    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await UserModel.create({ name: name, email: email, number: number, password: hashedPassword })

        return res.status(StatusCodes.CREATED).send('user created')
    } catch (error) {
        console.log(error);
    }

}


// login
const Login = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'email and password is required' })
    }

    const user = await UserModel.findOne({ email })

    if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Invalid Credentials' })
    }

    try {
        const checkedPassword = await bcrypt.compare(password, user.password)

        if (!checkedPassword) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Invalid Credentials' })
        }

        const token = JWT.sign({ userId: user._id, name: user.name, role: user.role }, process.env.JWT_SECRET, { expiresIn: '3d' });
        return res.status(StatusCodes.OK).json({ user: { msg: 'Login Successfully', user: user.name }, token })
    } catch (error) {
        console.log(error);
    }

}

const dashboard = async (req, res) => {
    console.log('hello admin');
}

const Logout = async (req, res) => {
    res.send('logout route')
}


const currentUser = async (req, res) => {
    // console.log('current user');
    const user = await UserModel.findOne({ _id: req.user.userId });
    // console.log(user);
    const userWithoutPassword = {
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        number: user.number
    }

    res.status(StatusCodes.OK).json({ currentUser: userWithoutPassword })
}

module.exports = { Register, Login, dashboard, Logout, currentUser };
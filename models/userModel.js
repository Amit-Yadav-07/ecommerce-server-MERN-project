const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        maxlength: [30, 'name can not be more then 20 characters']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email'],
        maxlength: [30, 'name can not be more then 20 characters']

    },
    number: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
        // maxlength: [30, 'name can not be more then 20 characters'],
        minlength: 5,
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'user'],
        default: 'user'
    }

}, { timestamps: true })



module.exports = mongoose.model('users', userSchema)
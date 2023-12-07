const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require('validator')

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, 'please enter an email address'],
        unique: true,
        validate: [isEmail, "please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, 'please enter a password'],
        minlength: [6, 'please enter a six character password or more']
    }
})

const User = mongoose.model('user', userSchema)

module.exports = User;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const User = require('../models/user')

const register = async (req, res) => {
    const userRegData = req.body
    const hashedPassword = await bcrypt.hash(userRegData.password, 10)

    try {
        const newUser = new User({
            name: userRegData.name,
            email: userRegData.email,
            password: hashedPassword,
        })

        await User.create(newUser)
        res.status(201).json({ message: "user Created", newUser });

    } catch (error) {
        if(error.code === 11000) {
            res.status(409).json({ message: "user already in use" });
        }
        console.log(error);
        return res.status(500).json({ message: "something went wrong"})
    }
}

module.exports = {
    register
}
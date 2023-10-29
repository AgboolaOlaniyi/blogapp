
const userModel = require("../models/user")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const logger = require('../logger');


const createUser = async ({ first_name, last_name, email, password,  gender, country }) => {
    const userInfo = { first_name, last_name, email, password,  gender, country }
    const existingUser = await userModel.findOne({ email: userInfo.email })

    if (existingUser) {
        return ({
            message: "User already exist",
            code: 409,

        })
    }

    const newUser = await userModel.create({
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        email: userInfo.email,
        password: userInfo.password,
        gender: userInfo.gender,
        country: userInfo.country


    })

    return ({
        message: "successful signup",
        code: 200,
        newUser

    })
}


const login = async ({ email, password }) => {
    logger.info('[CreateUser] => login process started')
    const logInfo = { email, password }
    const user = await userModel.findOne({ email: logInfo.email })
    if (!user) {
        return {
            code: 404,
            message: "User not found"
        }
    }
    const validPassword = await user.isValidPassword(logInfo.password)
    if (!validPassword) {
        return {
            code: 422,
            message: "email or password is incorrect",
        }
    }

    const token = await jwt.sign({ _id:user._id, email:user.email }, process.env.JWT_SECRET, { expiresIn: "1h" })
    return {
        message: "successful login",
        code: 200,
        user,
        token

    }

}



module.exports = { createUser, login }
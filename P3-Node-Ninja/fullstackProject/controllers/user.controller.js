import User from '../models/User.model.js'
import crypto from 'crypto'
import { sendVerifyMail, sendPasswordMail } from '../utils/mail.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import mongoose, { Schema } from 'mongoose';

const registerUser = async (req, res) => {
    // get data
    // validate
    // check if user already exists
    // create user in database
    // create a verifaction token
    // save token in database
    // send token as email to user
    // send success status to user

    const {name, email, password} = req.body
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;

    if(!name || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        })
    }

    if(!emailRegex.test(email)){
        return res.status(400).json({
            message: "Email should be valid"
        })
    }
    
    if(!passRegex.test(password)){
        return res.status(400).json({
            message: "Password should be valid"
        })
    }


    try {
        const existingUser = await User.findOne({email})

        if(existingUser){
            return res.status(400).json({
                message: "User already exists"
            })
        }

        const user = await User.create({
            name,
            email,
            password
        })

        if(!user) {
            return res.status(400).json({
                message: "User not registered"
            })
        }

        const token = crypto.randomBytes(32).toString('hex')
        user.verificationToken = token

        await user.save()

        await sendVerifyMail(email, token)
        
        return res.status(201).json({
            message: 'User registered successfully',
            success: true
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Error while registering user",
            error,
            success: false
        })
    }
}

const verifyUser = async (req, res) => {
    // get token from url
    // validate token
    // find user based on token
    // if not return error
    // set isVerified to true
    // remove verification token from db
    // save
    // return res

    const { token } = req.params

    if(!token) {
        return res.status(400).json({
            message: "Invalid token"
        })
    }

    try {
        const user = await User.findOne({verificationToken: token})

        if(!user){
            return res.status(400).json({
                message: "Invalid token"
            })
        }

        user.isVerified = true
        user.verificationToken = undefined

        await user.save()

        return res.status(201).json({
            message: 'User verified successfully',
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: "Error while verifing user",
            error,
            success: false
        })
    }
}

const loginUser = async (req, res) => {
    const {email, password} = req.body

    if(!email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        })
    }


    try {
        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({
                message: "Invalid email id"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid) {
            return res.status(400).json({
                message: "Incorrect password"
            })
        }

        const token = jwt.sign(
            {
                id: user._id
            }, 
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY
            }
            
        )

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            maxAge: 20*60*60*100
        }

        res.cookie('token', token, cookieOptions)

        return res.status(201).json({
            message: "User logged in sucessfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                role: user.role
            },
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: "Error while logging in user",
            error,
            success: false
        })
    }
}

const logoutUser = async (req, res) => {
    const { token } = req.cookies

    if(!token) {
        return res.status(400).json({
            message: "Invalid Token"
        })
    }

    res.clearCookie('token')

    return res.status(201).json({
        message: "User logged out successfully"
    })
}

const getUser = async (req, res) => {
    const { token } = req.cookies

    if(!token) {
        return res.status(400).json({
            message: "Invalid Token"
        })
    }

    try {
        const { id } = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)

        if(!id) {
            return res.status(400).json({
                message: "Invalid Token"
            })
        }

        const user = await User.findOne(
            { 
                _id: new mongoose.Types.ObjectId(id) 
            }
        ).select("-password -verificationToken")

        if(!user){
            return res.status(400).json({
                message: "Invalid Token"
            })
        }

        return res.status(201).json({
            message: "User details fetched",
            user,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error while fetching user info",
            error,
            success: false
        })
    }
}

const forgotPassword = async (req, res) => {
    const { email } = req.body

    if(!email) {
        return res.status(400).json({
            message: "Email is required"
        })
    }

    try {
        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({
                message: "User not found"
            })
        }

        const tempPassword = await crypto.randomBytes(8).toString('hex')

        user.password = tempPassword
        await user.save()

        await sendPasswordMail(email, tempPassword)

        return res.status(201).json({
            message: "Please check your mail",
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: "Error while fetching user info",
            error,
            success: false
        })
    }
}

const resetPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body
    const { token } = req.cookies

    if(!token) {
        return res.status(400).json({
            message: "Invalid Token"
        })
    }

    let passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
    
    if(!oldPassword || !newPassword) {
        return res.status(400).json({
            message: "All fields are required"
        })
    }
    
    if(!passRegex.test(newPassword)){
        return res.status(400).json({
            message: "new Password should be valid"
        })
    }

    try {
        const { id } = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)

        if(!id) {
            return res.status(400).json({
                message: "Invalid Token"
            })
        }

        const user = await User.findOne(
            { 
                _id: new mongoose.Types.ObjectId(id) 
            }
        )

        if(!user){
            return res.status(400).json({
                message: "User not found"
            })
        }

        const isPasswordValid = await bcrypt.compare(oldPassword, user.password)

        if(!isPasswordValid) {
            return res.status(400).json({
                message: "Incorrect password"
            })
        }

        user.password = newPassword
        await user.save()


        return res.status(201).json({
            message: "User password updated sucessfully",
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: "Error while fetching user info",
            error,
            success: false
        })
    }
}

export {
    registerUser,
    verifyUser,
    loginUser,
    logoutUser,
    getUser,
    forgotPassword,
    resetPassword
}
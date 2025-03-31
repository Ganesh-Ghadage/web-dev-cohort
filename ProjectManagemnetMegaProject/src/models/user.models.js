import mongoose, { Schema } from "mongoose"
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import crypto from "crypto"

const userSchema = new Schema(
    {
        avatar: {
            type: {
                url: String,
                localPath: String
            },
            default: {
                url: "https://placehold.co/600x400/png",
                localPath: ""
            }
        },
        userName: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            lowercase: true,
            index: true
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            lowercase: true,
            index: true
        },
        password: {
            type: String,
            trim: true,
            required: [true, "Password is required"],
            lowercase: true,
        },
        fullname: {
            type: String,
            trim: true,
            required: true,
        },
        isEmailVerified: {
            type: Boolean,
            default: false
        },
        refreshToke: {
            type: String,
        },
        forgotPasswordToken: {
            type: String,
        },
        forgotPasswordExpiry: {
            type: Date,
        },
        emailVerificationToken: {
            type: String,
        },
        emailVerificationExpiry: {
            type: Date,
        },
    }, 
    {
        timestamps: true
    }
)

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        return next()
    }

    this.password = await bcrypt.hash(this.password, 10)

    next()

})

userSchema.methods.isPasswordValid = async function(password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
            role: this.role
        }, 
        process.env.ACCESS_TOKEN_SECRET, 
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }    
    )
}

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id
        }, 
        process.env.REFRESH_TOKEN_SECRET, 
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }    
    )
}

userSchema.methods.generateEmailToke = function() {
    const unHashedToken = crypto.randomBytes(16).toString('hex')

    const hashedToken = crypto.createHash("rsh256").update(unHashedToken).digest('hex')
    const tokenExpiry = Date.now + (20*60*1000)  // 20 min

    return { unHashedToken, hashedToken, tokenExpiry }
}

export const User = mongoose.model('User', userSchema)


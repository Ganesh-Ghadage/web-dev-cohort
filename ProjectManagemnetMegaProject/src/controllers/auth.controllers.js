import { asyncHandler } from "../utils/async-handler.js";
import { ApiResponce } from "../utils/api-responce.js"
import { User } from "../models/user.models.js"
import { ApiError } from "../utils/api-error.js";
import { deleteFromCloudinary, upolodOnClodinary } from "../utils/cloudinary.js";
import fs from 'fs';
import { sendVerifyMail } from "../utils/mail.js";
import crypto from 'crypto';

const generateAccessAndRefreshToken = async (userId) => {
  if(!userId) return null;

  const user = await User.findById(userId)

  if(!user) {
    throw new ApiError(406, "User ID does not exits")
  }

  const accessToken = user.generateAccessToken()
  const refreshToken = user.generateRefreshToken()

  user.refreshToken = refreshToken
  await user.save({ validateBeforeSave: false })

  return { accessToken, refreshToken }
}

const registerUser = asyncHandler(async (req, res) => {
  const {username, email, password, fullname, role} = req.body

  const avatarLoacalPath = req.file?.path

  if(!avatarLoacalPath){
    throw new ApiError(404, "Avatar Image not found")
  }

  // check if user already exists or not
  const existingUser = await User.findOne({email})

  if(existingUser) {
   throw new ApiError(403, "User is already registered")
  }

  // upload avatar image to cloudinary
  let avatar;
  try {
    avatar = await upolodOnClodinary(avatarLoacalPath)
  } catch (error) {
    throw new ApiError(500, "Image upload on clodinary failed", error)
  }

  try {
    const createdUser = await User.create({
      email,
      password,
      username: username.toLowerCase(),
      fullname: fullname,
      avatar: {
        url: avatar.url,
        localPath: ""
      },
      // role,
    })
    
    // generate email verification token
    const { unHashedToken, hashedToken, tokenExpiry } = await createdUser.generateEmailToken()

    createdUser.emailVerificationToken = hashedToken
    createdUser.emailVerificationExpiry = tokenExpiry
    await createdUser.save()

    const user = await User.findById(createdUser._id).select("-password -refreshTooken")

    if(!user) {
      throw new ApiError(500, "User not registered")
    }

    // send emilaVerificationToken to user
    await sendVerifyMail(email, unHashedToken)

    res.status(201).json(new ApiResponce(201, user, "User registered sucessfully"))

  } catch (error) {

    console.log('error', error)

    if(avatar){
      await deleteFromCloudinary(avatar.url)
    }

    if(avatarLoacalPath && !avatar){
      fs.unlinkSync(avatarLoacalPath)
    }

    throw new ApiError(500, "Someting went wron while registering user", error)
  }

})

const verifyUser = asyncHandler(async (req, res) => {
  const { token } = req.params

  const hashedToken = crypto.createHash("sha256").update(token).digest('hex')

  const user = await User.findOne({emailVerificationToken: hashedToken})

  if(!user) {
    throw new ApiError(404, "User not found")
  }

  if(user.emailVerificationExpiry <= Date.now()) {
    throw new ApiError(406, "Verification token expired")
  }

  user.isEmailVerified = true
  user.emailVerificationToken = undefined
  user.emailVerificationExpiry = undefined

  await user.save()

  res.status(200).json(new ApiResponce(200, 
    {
      _id: user._id,
      email: user.email,
      username: user.username
    },
    "User verified successfully"
  ))

})

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body

  const user = await User.findOne({
    $or: [{ email }, { username }]
  })

  if(!user) {
    throw new ApiError(402, "Invalid user credentials")
  }

  const isPasswordValid = user.isPasswordValid(password)

  if(!isPasswordValid) {
    throw new ApiError(402, "Invalid user credentials")
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

  if(!accessToken || !refreshToken) {
    throw new ApiError(502, "Tokens generation failed")
  }

  const loggedInUser = await User.findById(user._id)
                                  .select("-password -refreshToken")

  if(!loggedInUser) {
    throw new ApiError(500, "Something went wrong, User not logged")
  }

  res.status(200)
    .cookie("accessToken", accessToken)
    .cookie("refreshToken", refreshToken)
    .json(new ApiResponce(200, 
      {
        user: loggedInUser,
        accessToken,
        refreshToken
      },
      "User logged in successfully"
    ))

})

export { 
  registerUser,
  verifyUser,
  loginUser
}
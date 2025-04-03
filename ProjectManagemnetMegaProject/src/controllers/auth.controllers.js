import { asyncHandler } from "../utils/async-handler.js";
import { ApiResponce } from "../utils/api-responce.js"
import { User } from "../models/user.models.js"
import { ApiError } from "../utils/api-error.js";
import { deleteFromCloudinary, upolodOnClodinary } from "../utils/cloudinary.js";
import fs from 'fs'
import { sendVerifyMail } from "../utils/mail.js";

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
    await sendVerifyMail(email, hashedToken)

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

export { registerUser }
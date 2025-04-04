import { User } from "../models/user.models.js"
import { ApiError } from "../utils/api-error.js"
import jwt from 'jsonwebtoken'
import { asyncHandler } from "../utils/async-handler.js"

const authenticateUser = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

  if(!token) {
    throw new ApiError(403, "unauthorized request")
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
  
    const user = await User.findById(decodedToken._id)
                      .select("-password -refreshToken")
  
    if(!user) {
      throw new ApiError(404, "Invalid token")
    }
  
    req.user = user
  
    return next()

  } catch (error) {
    throw new ApiError(400, error?.messgae || "Invalid token")
  }
})


export default authenticateUser
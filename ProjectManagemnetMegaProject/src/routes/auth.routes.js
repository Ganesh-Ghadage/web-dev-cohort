import { Router } from "express"
import validate from "../middlewares/validator.middleware.js"
import { userLoginValidator, userRegisterValidator, userVerificationValidator } from "../validators/auth.validators.js"
import { getUserProfile, loginUser, logoutUser, registerUser, verifyUser } from "../controllers/auth.controllers.js"
import { upload } from "../middlewares/multer.middleware.js"
import authenticateUser from "../middlewares/auth.middleware.js"

const router = Router()

router.route('/register').post(
  upload.single('avatar'), 
  userRegisterValidator(), 
  validate, 
  registerUser
)

router.route('/verify/:token').post(
  userVerificationValidator(),
  validate,
  verifyUser
)

router.route('/login').post(
  userLoginValidator(),
  validate,
  loginUser
)

router.route('/logout').post(
  authenticateUser,
  logoutUser
)

router.route('/profile').get(
  authenticateUser,
  getUserProfile
)

export default router
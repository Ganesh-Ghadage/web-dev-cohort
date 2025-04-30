import { Router } from "express"
import validate from "../middlewares/validator.middleware.js"
import { changeCurrentPasswordValidator, userLoginValidator, userRegisterValidator, userVerificationValidator, forgotPasswordRequestValidator } from "../validators/auth.validators.js"
import { getUserProfile, loginUser, logoutUser, refreshAccessTonken, registerUser, verifyUser, resendEmailVerification, changeCurrentPassword, forgotPasswordRequest } from "../controllers/auth.controllers.js"
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

router.route('/refresh-tokens').get(
  authenticateUser,
  refreshAccessTonken
)

router.route('/resend-verification-mail').post(
  authenticateUser,
  resendEmailVerification
)

router.route('/change-current-password').post(
  authenticateUser,
  changeCurrentPasswordValidator(),
  validate,
  changeCurrentPassword
)

router.route('/send-password-reset-request').post(
  forgotPasswordRequestValidator(),
  validate,
  forgotPasswordRequest
)

export default router
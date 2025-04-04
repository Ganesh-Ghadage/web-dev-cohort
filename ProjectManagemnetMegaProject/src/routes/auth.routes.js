import { Router } from "express"
import validate from "../middlewares/validator.middleware.js"
import { userLoginValidator, userRegisterValidator, userVerificationValidator } from "../validators/auth.validators.js"
import { loginUser, registerUser, verifyUser } from "../controllers/auth.controllers.js"
import { upload } from "../middlewares/multer.middleware.js"

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

export default router
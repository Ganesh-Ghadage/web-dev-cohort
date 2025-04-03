import { Router } from "express"
import validate from "../middlewares/validator.middleware.js"
import { userRegisterValidator, userVerificationValidator } from "../validators/auth.validators.js"
import { registerUser, verifyUser } from "../controllers/auth.controllers.js"
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

export default router
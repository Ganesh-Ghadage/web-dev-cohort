import { Router } from "express"
import validate from "../middlewares/validator.middleware.js"
import { userRegisterValidator } from "../validators/auth.validators.js"
import { registerUser } from "../controllers/auth.controllers.js"
import { upload } from "../middlewares/multer.middleware.js"

const router = Router()

router.route('/register').post(
  upload.single('avatar'), 
  userRegisterValidator(), 
  validate, 
  registerUser
)

export default router
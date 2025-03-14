import express from 'express'
import { 
    registerUser, 
    loginUser, 
    verifyUser, 
    logoutUser, 
    getUser, 
    forgotPassword, 
    resetPassword
} from '../controllers/user.controller.js'

const router = express.Router()

router.post('/register', registerUser)
router.get('/verify/:token', verifyUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)
router.get('/userProfile', getUser)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)


export default router
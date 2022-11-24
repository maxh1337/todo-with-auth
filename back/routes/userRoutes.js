import express from 'express'
import { authUser } from '../controllers/authController.js'
import { getAllUsers } from '../controllers/profileController.js'
import { protect } from '../middleware/authMiddleware.js'
import { registerUser } from '../controllers/regController.js'

const router = express.Router()

router.route('/profile').get(protect, getAllUsers)
router.route('/login').post(authUser)
router.route('/register').post(registerUser)

export default router

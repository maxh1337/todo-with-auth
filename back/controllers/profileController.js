import expressAsyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

// export const getUserProfile = expressAsyncHandler(async (req, res) => {
// 	const user = await User.findById(req.user._id).select('-password').lean()
//
// 	res.json({
// 		...user,
// 	})
// })

export const getAllUsers = expressAsyncHandler(async (req, res) => {
	const users = await User.find({}).lean()

	res.json({
		...users,
	})
})

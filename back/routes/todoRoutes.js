import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import {
	createTodo,
	deleteTodo,
	getAllTodos,
	getAllTodosByUserId,
	getTodo,
	updateTodo,
} from '../controllers/todoController.js'

const router = express.Router()
router
	.route('/')
	.get(protect, getAllTodosByUserId)
	.post(protect, createTodo)
	.put(protect, updateTodo)

router.route('/all').get(protect, getAllTodos)
router.route('/:id').get(protect, getTodo).delete(protect, deleteTodo)

export default router

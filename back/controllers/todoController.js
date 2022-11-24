import expressAsyncHandler from 'express-async-handler'
import Todo from '../models/todoModel.js'

//@description Create new todo
//@route POST /api/todos
//@access Private

export const createTodo = expressAsyncHandler(async (req, res) => {
	const user = req.user._id
	const { name } = req.body

	const todo = await Todo.create({
		user,
		name,
	})

	res.json(todo)
})

//@description Get todo by id
//@route GET /api/todos/:id
//@access Private

export const getTodo = expressAsyncHandler(async (req, res) => {
	const todo = await Todo.findById(req.params.id)

	res.json(todo)
})

//@description GEt all todos
//@route GET /api/todos
//@access Private

export const getAllTodosByUserId = expressAsyncHandler(async (req, res) => {
	const user = req.user._id
	const todos = await Todo.find({ user: user }).lean()

	res.json(todos)
})

//@description Update todo
//@route PUT /api/todos
//@access Private

export const updateTodo = expressAsyncHandler(async (req, res) => {
	const { name, checked, todoId } = req.body

	const todo = await Todo.findById(todoId)

	if (!todo) {
		res.status(404)
		throw new Error('Данный todo не найден')
	}

	todo.name = name
	todo.checked = checked

	const updatedTodo = await todo.save()

	res.json(updatedTodo)
})

//@description GEt all todos
//@route DELETE /api/todos
//@access Private

export const deleteTodo = expressAsyncHandler(async (req, res) => {
	const { todoId } = req.body

	const todo = await Todo.findById(todoId)

	if (!todo) {
		res.status(404)
		throw new Error('Данный todo не найден')
	}

	await todo.remove()

	res.json({ message: 'Todo удален' })
})

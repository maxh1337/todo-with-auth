import asyncHandler from 'express-async-handler'
import Todo from '../models/todoModel.js'

//@description Create new todo
//@route POST /api/todos
//@access Private

export const createTodo = asyncHandler(async (req, res) => {
	const user = req.user._id
	const { name } = req.body
	console.log(name)

	if(!name) {
		res.status(500)
		throw new Error('Вы не указали название')
	}

	const todo = await Todo.create({
		user,
		name,
	})

	res.json(todo)
})

//@description Get todo by id
//@route GET /api/todos/:id
//@access Private

export const getTodo = asyncHandler(async (req, res) => {
	const todo = await Todo.findById(req.params.id)

	res.json(todo)
})

//@description GEt all todos by id
//@route GET /api/todos
//@access Private

export const getAllTodosByUserId = asyncHandler(async (req, res) => {
	const user = req.user._id
	const todos = await Todo.find({ user: user }).lean()

	res.json(todos)
})

//@description GEt all todos
//@route GET /api/todos/all
//@access Private

export const getAllTodos = asyncHandler(async (req, res) => {
	const todos = await Todo.find({}).lean()

	res.json(todos)
})

//@description Update todo
//@route PUT /api/todos
//@access Private

export const updateTodo = asyncHandler(async (req, res) => {
	const { item } = req.body


	
	const todo = await Todo.findById(item.todoId)

	if (!todo) {
		res.status(404)
		throw new Error('Данный todo не найден')
	}

	if(item.name) {
		todo.name = item.name
	}



	todo.checked = item.checked
	const updatedTodo = await todo.save()

	res.json(updatedTodo)
})

//@description DELETE todo by ID
//@route DELETE /api/todos/:id
//@access Private

export const deleteTodo = asyncHandler(async (req, res) => {
	const todoId = req.params.id

	const todo = await Todo.findById(todoId)

	if (!todo) {
		res.status(404)
		throw new Error('This todo not found')
	}

	await todo.remove()

	res.json({ message: 'Todo deleted' })
})

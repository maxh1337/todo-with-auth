import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema

const todoSchema = mongoose.Schema({
	user: {
		type: ObjectId,
		ref: 'User',
		required: true,
	},
	name: {
		required: true,
		type: String,
	},
	checked: {
		type: Boolean,
		default: false,
	},
},
{
	timestamps: true,
}
)

const Todo = mongoose.model('Todo', todoSchema)
export default Todo

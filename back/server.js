import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'
import colors from 'colors'

/* Routes */
import userRoutes from './routes/userRoutes.js'
import todoRoutes from './routes/todoRoutes.js'

/* Config */

import { connectDB } from './config/db.js'

/* Middleware */

import { errorHandler, notFound } from './middleware/errorMiddleware.js'

// Подгрузка настроек проекта в process.env
dotenv.config()

// Подключение базы данных
connectDB()

// Включаем express приложение
const app = express()

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

app.use(express.json())
app.use(
	cors({
		origin: 'http://localhost:3000',
	})
)

/* Подключение route файлов */

app.use('/api/users', userRoutes)
app.use('/api/todos', todoRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	)
)

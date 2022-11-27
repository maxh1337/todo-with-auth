import { Routes, Route } from 'react-router-dom'
import Todos from './components/todos/todos'
import Login from './components/auth/login'
import Register from './components/auth/register'

function App() {
	return (
		<Routes>
			<Route path="/" element={<Todos />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
		</Routes>
	)
}

export default App

import React, { useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import App from '../App'
import { UserContext } from '../contexts/UserContext'

const AppProvider = () => {
	const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'))
	const [userId, setUserId] = useState(!!localStorage.getItem('userId'))

	return (
		<AuthContext.Provider value={{ isAuth, setIsAuth }}>
			<UserContext.Provider value={{ userId, setUserId}}>
				<App />
			</UserContext.Provider>
		</AuthContext.Provider>
	)
}

export default AppProvider

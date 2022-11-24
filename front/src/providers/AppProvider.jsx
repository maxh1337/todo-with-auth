import React, { useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import App from '../App'

const AppProvider = () => {
	const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'))

	return (
		<AuthContext.Provider value={{ isAuth, setIsAuth }}>
			<App />
		</AuthContext.Provider>
	)
}

export default AppProvider

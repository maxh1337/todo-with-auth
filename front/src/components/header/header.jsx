import React from 'react'
import Wrapper from '../wrapper/wrapper'
import styles from './header.module.scss'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const Header = () => {
	const navigate = useNavigate()
	const { isAuth, setIsAuth } = useAuth()

	const handleLogout = () => {
		localStorage.removeItem('token')
		setIsAuth(false)
	}

	return (
		<div className={styles.header}>
			{isAuth ? (
				<>
					<button onClick={handleLogout}>Logout</button>
				</>
			) : (
				<>
					<button onClick={() => navigate('/login')}>Login</button>
					<button onClick={() => navigate('/register')}>Register</button>
				</>
			)}
		</div>
	)
}

export default Header

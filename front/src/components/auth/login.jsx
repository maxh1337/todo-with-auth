import React, { useState } from 'react'
import Wrapper from '../wrapper/wrapper'
import styles from './register.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import { $api } from '../api/api'
import { useAuth } from '../../hooks/useAuth'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const { setIsAuth } = useAuth()

	const navigate = useNavigate()

	const successLogin = (token) => {
		localStorage.setItem('token', token)
		setIsAuth(true)
		setPassword('')
		setEmail('')

		navigate('/')
	}

	const {
		mutate: auth,
		isLoading: isLoadingAuth,
		error: errorAuth,
	} = useMutation(
		'Auth',
		() =>
			$api({
				url: '/users/login',
				type: 'POST',
				body: { email, password },
				auth: false,
			}),
		{
			onSuccess(data) {
				successLogin(data.token)
			},
		}
	)

	const handleSumbit = (e) => {
		e.preventDefault()
		auth()
	}
	return (
		<Wrapper>
			<form onSubmit={handleSumbit} className={styles.login}>
				<h1>Авторизация</h1>
				<input
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.currentTarget.value)}
				/>
				<input
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.currentTarget.value)}
				/>
				<div>
					<p>Еще не зарегистрированы?</p>
					<Link to="/login">Зарегистрироваться</Link>
				</div>
				<button type="submit">Войти</button>
			</form>
		</Wrapper>
	)
}

export default Login

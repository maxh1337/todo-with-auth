import React, { useState } from 'react'
import Wrapper from '../wrapper/wrapper'
import styles from './register.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import { $api } from '../api/api'
import { useAuth } from '../../hooks/useAuth'

const Register = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const setIsAuth = useAuth()

	const navigate = useNavigate()

	const successLogin = (token) => {
		localStorage.setItem('token', token)
		setIsAuth(true)

		setIsAuth(true)
		setName('')
		setPassword('')
		setEmail('')

		navigate('/')
	}

	const {
		mutate: register,
	} = useMutation(
		'Registration',
		() =>
			$api({
				url: '/users/register',
				type: 'POST',
				body: { name, email, password },
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
		register()
	}
	return (
		<Wrapper>
			<form onSubmit={handleSumbit} className={styles.login}>
				<h1>Регистрация</h1>
				<input
					value={name}
					onChange={(e) => setName(e.currentTarget.value)}
					placeholder="Имя"
				/>
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
					<p>Уже есть аккаунт?</p>
					<Link to="/login">Войти</Link>
				</div>

				<button type="submit" className={styles.buttonReg}>
					Зарегистрироваться
				</button>
			</form>
		</Wrapper>
	)
}

export default Register

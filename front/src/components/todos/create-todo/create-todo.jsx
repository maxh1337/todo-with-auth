import React, { useState } from 'react'
import create from '../../../images/plus-svgrepo-com.svg'
import styles from './create-todo.module.scss'
import { useMutation } from 'react-query'
import { $api } from '../../api/api'

const CreateTodo = ({ value, onChange, onClick }) => {
	const [name, setName] = useState('')
	return (
		<div className={styles.createTodo}>
			<input
				placeholder="Создать новую todo"
				value={value}
				onChange={onChange}
			/>
			<button>
				<img alt="Создание новой Todo" src={create} onClick={onClick} />
			</button>
		</div>
	)
}

export default CreateTodo

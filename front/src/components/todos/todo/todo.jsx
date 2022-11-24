import { useState } from 'react'
import styles from './todo.module.scss'
import trash from '../../../images/trash.svg'

const Todo = ({ text, checked, todoId, onClick }) => {
	const [checkd, setCheckd] = useState(false)

	const onChange = () => {
		console.log("smthing has been changed")
	}

	return (
		<div className={styles.todos}>
			<div className={styles.checked}>
				<input type="checkbox" checked={checked} onChange={onChange} />
				<label></label>
			</div>
			<p>{text}</p>
			<button onClick={onClick} value={todoId}>
				<img src={trash} alt="trash button" />
			</button>
		</div>
	)
}

export default Todo

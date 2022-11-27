import styles from './todo.module.scss'
import trash from '../../../images/trash.svg'

const Todo = ({ text, onClick, onChange, checked, onClickChange }) => {
	return (
		<div className={styles.todos}>
			<div className={styles.checked}>
				<input type="checkbox" checked={checked} />
				<label onClick={onClickChange}></label>
			</div>
			<input defaultValue={text} onChange={onChange}></input>
			<button onClick={onClick}>
				<img src={trash} alt="trash button" />
			</button>
		</div>
	)
}

export default Todo

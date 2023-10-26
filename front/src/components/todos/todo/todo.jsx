import styles from './todo.module.scss'
import trash from '../../../images/trash.svg'

const Todo = ({ text, onClick, onChange, checked, onClickChange, createdAt, user }) => {
	const currentUserId = localStorage.getItem('userId')

	const newShortCreatedAt = createdAt.substring(0,10)

	return (
		<div>
			<p className={styles.createdAt}>Создано: {newShortCreatedAt}</p>
			<div className={styles.todos}>
				<div className={styles.checked}>
					<input type="checkbox" checked={checked} onChange={() => console.log('Костыль чтоб не ругалось на отсутствие onChange')}/>
					<label onClick={onClickChange}></label>
				</div>
				<input defaultValue={text} onChange={onChange}></input>
				{user === currentUserId ? (
				<button onClick={onClick}>
					<img src={trash} alt="trash button" />
				</button>
				): null}

			</div>
		</div>
	)
}

export default Todo

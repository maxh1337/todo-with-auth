import create from '../../../images/plus-svgrepo-com.svg'
import styles from './create-todo.module.scss'

const CreateTodo = ({ value, onChange, onClick }) => {
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

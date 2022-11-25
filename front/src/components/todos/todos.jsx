import { useEffect, useState } from 'react'
import Todo from './todo/todo'
import Wrapper from '../wrapper/wrapper'
import Header from '../header/header'
import styles from './todos.module.scss'
import CreateTodo from './create-todo/create-todo'
import { useQuery } from 'react-query'
import { $api } from '../api/api'
import Loader from '../ui/Loader'
import { useAuth } from '../../hooks/useAuth'
import { useMutation } from 'react-query'
import Alert from '../ui/Alert/Alert'

const Todos = () => {
	const [name, setName] = useState('')
	const { isAuth } = useAuth()
	const [todos, setTodos] = useState([])

	const { isSuccess, isLoading, data, refetch, error } = useQuery(
		[`get all todos`],
		() =>
			$api({
				url: `/todos`,
			}),
		{
			refetchOnWindowFocus: false,
		}
	)

	const {
		mutate: createTodo,
		isSuccess: isSuccessMutate,
		error: CreateError,
	} = useMutation(
		'Create new todo',
		() =>
			$api({
				url: '/todos',
				type: 'POST',
				body: { name },
			}),
		{
			onSuccess(data) {
				console.log(`todo создано ${name}`)
				refetch()
			},
		}
	)

	const { mutate: deleteTodo, mutateError } = useMutation(
		'Delete existing todo',
		(item) =>
			$api({
				url: `/todos/${item}`,
				type: 'DELETE',
			}),
		{
			onSuccess(data) {
				console.log('Успешно удалено')
				refetch()
			},
		}
	)

	const handleDeleteClick = (item) => {
		deleteTodo(item)
	}

	return (
		<Wrapper>
			<Header />
			<CreateTodo
				value={name}
				onChange={(e) => setName(e.currentTarget.value)}
				onClick={() => {
					createTodo()
					setName('')
				}}
			/>
			{error && <Alert type="error" text={error} />}
			{CreateError && <Alert type="error" text={CreateError} />}
			{isSuccessMutate && <Alert text="Успешно создано" />}
			{isLoading && <Loader />}
			{isSuccess ? (
				<div className={styles.todos}>
					<p>Tasks</p>
					{isAuth &&
						data.map((item, idx) => {
							return (
								<Todo
									text={item.name}
									checked={item.checked}
									key={idx}
									onClick={() => handleDeleteClick(item._id)}
								/>
							)
						})}
				</div>
			) : isAuth === false && isLoading === false ? (
				<p>Авторизуйтесь</p>
			) : (
				isLoading === false && <p>Todos не найдены</p>
			)}
		</Wrapper>
	)
}

export default Todos

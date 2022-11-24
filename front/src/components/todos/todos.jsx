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

const Todos = () => {
	const [name, setName] = useState('')
	const [todoId, setTodoId] = useState('')
	const { isAuth } = useAuth()

	useEffect(() => {}, [])

	const { data, isSuccess, isLoading } = useQuery(
		'get all todos',
		() =>
			$api({
				url: `/todos/`,
			}),
		{
			refetchOnWindowFocus: false,
		}
	)

	const {
		mutate: createTodo,
		isSuccess: isSuccessMutate,
		error,
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
			},
		}
	)

	const { mutate: deleteTodo, mutateError } = useMutation(
		'Delete existing todo',
		() =>
			$api({
				url: '/todos',
				type: 'DELETE',
				body: { todoId },
			}),
		{
			onSuccess(data) {
				console.log('Успешно удалено')
			},
		}
	)

	const handleDeleteClick = (item) => {
		setTodoId(item)
		deleteTodo(item)
		console.log(item)
	}

	return (
		<Wrapper>
			<Header />
			<CreateTodo
				value={name}
				onChange={(e) => setName(e.currentTarget.value)}
				onClick={() => createTodo()}
			/>
			{isLoading && <Loader />}
			{isSuccess ? (
				<div className={styles.todos}>
					<p>Tasks</p>
					{data.map((item, idx) => {
						return (
							<Todo
								text={item.name}
								checked={item.checked}
								key={idx}
								todoId={item.id}
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
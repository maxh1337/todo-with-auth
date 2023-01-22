import { useState } from 'react'
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
import debounce from 'lodash.debounce'

const Todos = () => {
	const [name, setName] = useState('')
	const { isAuth } = useAuth()

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
		item =>
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

	const {
		mutate: changeChecked,
		error: errorChange,
		isSuccess: isSuccessChange,
	} = useMutation(
		'Change todo checked',
		item =>
			$api({
				url: '/todos',
				type: 'PUT',
				body: { item },
			}),
		{
			onSuccess() {
				refetch()
			},
		}
	)

	const handleDeleteClick = item => {
		deleteTodo(item)
	}

	return (
		<Wrapper>
			<Header />
			<CreateTodo
				value={name}
				onChange={e => setName(e.currentTarget.value)}
				onClick={() => {
					createTodo()
					setName('')
				}}
			/>
			{(CreateError || errorChange || error || mutateError) && (
				<Alert
					type="error"
					text={CreateError || errorChange || error || mutateError}
				/>
			)}
			{(isSuccessMutate || isSuccessChange) && <Alert text="Успешно" />}
			{isLoading && <Loader />}
			{isSuccess ? (
				<div className={styles.todos}>
					<p>Tasks</p>
					{isAuth &&
						data.map((item, idx) => {
							return (
								<Todo
									createdAt={item.createdAt}
									text={item.name}
									key={idx}
									checked={item.checked}
									onClick={() => handleDeleteClick(item._id)}
									onChange={debounce(
										e =>
											e.target.value &&
											changeChecked({
												name: e.target.value,
												todoId: item._id,
												checked: item.checked,
											}),
										1000
									)}
									onClickChange={e => {
										changeChecked({
											checked: !item.checked,
											todoId: item._id,
										})
									}}
								></Todo>
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

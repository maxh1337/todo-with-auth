import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

export const useUserId= () => {
	const { userId, setUserId } = useContext(UserContext)

	return {
		userId,
		setUserId,
	}
}

import { createContext } from 'react'

export const UserContext = createContext({
	userId: false,
	setUserId:(userId) => {},
})

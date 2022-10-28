import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useAuthQuery } from 'app/store/user/user.api'

export const useAuth = () => {
	const token = localStorage.getItem('token')

	useAuthQuery({
		token: token,
	})
	return useMemo(() => ({}), [token])
}

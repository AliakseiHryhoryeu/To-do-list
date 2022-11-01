import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useAuthQuery } from 'app/store/user/user.api'
import { RootState } from 'app/store'
import { useReadListsByTokenQuery } from 'app/store/list/list.api'
import { useReadTasksByTokenQuery } from 'app/store/task/task.api'

export const useGetData = () => {
	const token = localStorage.getItem('token')

	const { userId } = useSelector((state: RootState) => {
		return {
			isTrialMode: state.user.trialMode,
			userId: state.user.activeUser.id,
		}
	})
	useReadListsByTokenQuery({})

	useReadTasksByTokenQuery({})

	return useMemo(() => ({}), [userId])
}

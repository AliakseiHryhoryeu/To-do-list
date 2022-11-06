import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from 'app/store'

import { useAuthQuery } from 'app/store/user/user.api'
import { useReadListsByTokenQuery } from 'app/store/list/list.api'
import { useReadTasksByTokenQuery } from 'app/store/task/task.api'

export const useAuth = () => {
	const { userId, token, isTrialMode } = useSelector((state: RootState) => {
		return {
			isTrialMode: state.user.trialMode,
			userId: state.user.activeUser.id,
			token: state.user.token,
		}
	})

	useAuthQuery({})
	useReadListsByTokenQuery({})
	useReadTasksByTokenQuery({})

	return useMemo(() => ({}), [isTrialMode, token, userId])
}

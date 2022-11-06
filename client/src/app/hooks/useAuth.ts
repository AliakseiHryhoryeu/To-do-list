import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from 'app/store'

import { useAuthQuery } from 'app/store/user/user.api'
import { useAuthReadListsByTokenQuery } from 'app/store/list/list.api'
import { useAuthReadTasksByTokenQuery } from 'app/store/task/task.api'

export const useAuth = () => {
	const { token, isTrialMode } = useSelector((state: RootState) => {
		return {
			isTrialMode: state.user.trialMode,
			userId: state.user.activeUser.id,
			token: state.user.token,
		}
	})

	useAuthQuery({})
	useAuthReadListsByTokenQuery({})
	useAuthReadTasksByTokenQuery({})

	return useMemo(() => ({}), [isTrialMode, token])
}

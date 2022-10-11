import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import { taskActions } from 'app/store/task/task.slice'
import { listActions } from 'app/store/list/list.slice'
import { userApiActions } from 'app/store/user/user.api'

const allActions = {
	...taskActions,
	...listActions,
}
export const useActions = () => {
	const dispach = useDispatch()

	return bindActionCreators(allActions, dispach)
}

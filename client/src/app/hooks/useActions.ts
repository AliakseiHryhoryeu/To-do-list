import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import { taskActions } from 'app/state/task/task.slice'
import { listActions } from 'app/state/list/list.slice'

const allActions = {
	...taskActions,
	...listActions,
}

export const useActions = () => {
	const dispach = useDispatch()

	return bindActionCreators(allActions, dispach)
}

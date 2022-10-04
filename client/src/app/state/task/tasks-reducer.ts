import { TasksActionsTypes } from 'app/models'
import { RootState } from '../state-types-reducer'

const defaultState: RootState.TasksState = {
	allTasks: [],
}

export const tasksReducer = (state = defaultState, action) => {
	switch (action.type) {
		case TasksActionsTypes.GET_TASKS:
			return {
				...state,
				allTasks: action.payload,
			}
		case TasksActionsTypes.ADD_TASK:
			return {
				...state,
				allTasks: [...state.allTasks, { ...action.payload }],
			}
		case TasksActionsTypes.EDIT_TASK:
			const index = state.allTasks.findIndex(
				list => list._id === action.payload._id
			)
			const newArray = [...state.allTasks]
			newArray[index] = action.payload
			return {
				...state,
				allTasks: newArray,
			}

		default:
			return state
	}
}

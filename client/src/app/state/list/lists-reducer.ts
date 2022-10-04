import { RootState } from '../state-types-reducer'
import { TasksActionsTypes, ListsActionsTypes } from 'app/models'

const defaultState: RootState.ListsState = {
	allLists: [],
	activeList: [],
	showAllLists: true,
	colors: ['grey', 'lime', 'purple', 'black', 'red', 'green', 'blue', 'pink'],
}

export const listsReducer = (state = defaultState, action) => {
	let index
	let newArray

	switch (action.type) {
		case ListsActionsTypes.GET_LISTS:
			return {
				...state,
				allLists: action.payload,
				activeList: action.payload,
			}
		case ListsActionsTypes.SHOW_ALL_LISTS:
			return {
				...state,
				activeList: state.allLists,
				showAllLists: true,
			}
		case ListsActionsTypes.SET_LIST:
			return {
				...state,
				activeList: [{ ...action.payload }],
				showAllLists: false,
			}
		case ListsActionsTypes.ADD_LIST:
			return {
				...state,
				allLists: [...state.allLists, { ...action.payload }],
				activeList: [...state.allLists, { ...action.payload }],
			}
		case ListsActionsTypes.EDIT_LIST:
			index = state.allLists.findIndex(list => list._id === action.payload._id)
			newArray = [...state.allLists]
			newArray[index] = action.payload
			return {
				...state,
				allLists: newArray,
				activeList: newArray,
			}

		case ListsActionsTypes.DELETE_LIST:
			return {
				...state,
				allLists: action.payload,
				activeList: action.payload,
				showAllLists: true,
			}
		case TasksActionsTypes.DELETE_TASK:
			index = state.allLists.findIndex(list => list._id === action.payload._id)
			newArray = [...state.allLists]
			newArray[index] = action.payload
			return {
				...state,
				allLists: newArray,
				activeList: newArray,
			}
		default:
			return state
	}
}

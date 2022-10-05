import { IList, IListState, ColorsList } from './list.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: IListState = {
	allLists: [
		{
			_id: '',
			title: '',
			color: 'blue',
			date: '',
			tasksId: [''],
			userId: '',
		},
	],
	activeList: [],
	showAllLists: true,
	colors: ColorsList,
}

export const listSlice = createSlice({
	name: 'list',
	initialState,
	reducers: {
		getFeedback: (state, action: PayloadAction<IList>) => {
			state.allLists.push(action.payload)
		},
		addFeedback: (state, action: PayloadAction<IList>) => {
			state.allLists.push(action.payload)
		},
		editFeedback: (state, action: PayloadAction<IList>) => {
			state.allLists.push(action.payload)
		},
		deleteFeedback: (state, action: PayloadAction<IList>) => {
			state.allLists.push(action.payload)
		},
	},
})

export default listSlice.reducer

export const listReducer = listSlice.reducer
export const listActions = listSlice.actions


// import { useMemo } from 'react'
// import { Dispatch, bindActionCreators } from 'redux'
// import axios from 'axios'

// import config from 'assets/config.json'

// export namespace ListsActions {
// 	export enum Type {
// 		GET_LISTS = 'LISTS/GET_LISTS',
// 		GET_LIST = 'LISTS/GET_LIST',
// 		SET_LIST = 'LISTS/SET_LIST',
// 		SHOW_ALL_LISTS = 'LISTS/SHOW_ALL_LISTS',
// 		ADD_LIST = 'LISTS/ADD_LIST',
// 		EDIT_LIST = 'LISTS/EDIT_LIST',
// 		DELETE_LIST = 'LISTS/DELETE_LIST',
// 	}

// 	export const getLists = userId => {
// 		return async dispatch => {
// 			try {
// 				const response = await axios.get(config.proxy + `api/lists/getLists`, {
// 					params: {
// 						userId: userId,
// 					},
// 				})
// 				dispatch({ type: Type.GET_LISTS, payload: response.data.lists })
// 			} catch (e) {
// 				console.log(e)
// 			}
// 		}
// 	}

// 	export const setList = listId => {
// 		return async dispatch => {
// 			try {
// 				const response = await axios.get(config.proxy + `api/lists/getList`, {
// 					params: {
// 						listId: listId,
// 					},
// 				})
// 				dispatch({ type: Type.SET_LIST, payload: response.data.list })
// 			} catch (e) {
// 				console.log(e)
// 			}
// 		}
// 	}

// 	export const showAllLists = () => {
// 		return async dispatch => {
// 			try {
// 				dispatch({ type: Type.SHOW_ALL_LISTS })
// 			} catch (e) {
// 				console.log(e)
// 			}
// 		}
// 	}

// 	export const addList = (userId, title, color) => {
// 		return async dispatch => {
// 			try {
// 				const response = await axios.post(config.proxy + `api/lists/addList`, {
// 					userId: userId,
// 					color: color,
// 					title: title,
// 				})
// 				dispatch({ type: Type.ADD_LIST, payload: response.data })
// 			} catch (e) {
// 				console.log(e)
// 			}
// 		}
// 	}

// 	export const editList = (listId, title) => {
// 		return async dispatch => {
// 			try {
// 				const response = await axios.put(config.proxy + `api/lists/editList`, {
// 					listId: listId,
// 					title: title,
// 				})
// 				dispatch({ type: Type.EDIT_LIST, payload: response.data.list })
// 			} catch (e) {
// 				console.log(e)
// 			}
// 		}
// 	}

// 	export const deleteList = listId => {
// 		return async dispatch => {
// 			try {
// 				const response = await axios.put(
// 					config.proxy + `api/lists/deleteList`,
// 					{
// 						listId: listId,
// 					}
// 				)
// 				dispatch({ type: Type.DELETE_LIST, payload: response.data.lists })
// 			} catch (e) {
// 				console.log(e)
// 			}
// 		}
// 	}
// }

// export type ListsActions = Omit<typeof ListsActions, 'Type'>
// export const useListsActions = (dispatch: Dispatch) => {
// 	const { Type, ...actions } = ListsActions
// 	return useMemo(
// 		() => bindActionCreators(actions as any, dispatch),
// 		[dispatch]
// 	) as ListsActions
// }

// import { RootState } from '../state-types-reducer'
// import { TasksActionsTypes, ListsActionsTypes } from 'app/models'

// const defaultState: RootState.ListsState = {
// 	allLists: [],
// 	activeList: [],
// 	showAllLists: true,
// 	colors: ['grey', 'lime', 'purple', 'black', 'red', 'green', 'blue', 'pink'],
// }

// export const listsReducer = (state = defaultState, action) => {
// 	let index
// 	let newArray

// 	switch (action.type) {
// 		case ListsActionsTypes.GET_LISTS:
// 			return {
// 				...state,
// 				allLists: action.payload,
// 				activeList: action.payload,
// 			}
// 		case ListsActionsTypes.SHOW_ALL_LISTS:
// 			return {
// 				...state,
// 				activeList: state.allLists,
// 				showAllLists: true,
// 			}
// 		case ListsActionsTypes.SET_LIST:
// 			return {
// 				...state,
// 				activeList: [{ ...action.payload }],
// 				showAllLists: false,
// 			}
// 		case ListsActionsTypes.ADD_LIST:
// 			return {
// 				...state,
// 				allLists: [...state.allLists, { ...action.payload }],
// 				activeList: [...state.allLists, { ...action.payload }],
// 			}
// 		case ListsActionsTypes.EDIT_LIST:
// 			index = state.allLists.findIndex(list => list._id === action.payload._id)
// 			newArray = [...state.allLists]
// 			newArray[index] = action.payload
// 			return {
// 				...state,
// 				allLists: newArray,
// 				activeList: newArray,
// 			}

// 		case ListsActionsTypes.DELETE_LIST:
// 			return {
// 				...state,
// 				allLists: action.payload,
// 				activeList: action.payload,
// 				showAllLists: true,
// 			}
// 		case TasksActionsTypes.DELETE_TASK:
// 			index = state.allLists.findIndex(list => list._id === action.payload._id)
// 			newArray = [...state.allLists]
// 			newArray[index] = action.payload
// 			return {
// 				...state,
// 				allLists: newArray,
// 				activeList: newArray,
// 			}
// 		default:
// 			return state
// 	}
// }

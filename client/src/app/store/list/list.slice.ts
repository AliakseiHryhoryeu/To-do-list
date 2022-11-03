import { IList, IListState, ColorsList } from './list.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
	listApi,
	useCreateListQuery,
	useReadListQuery,
	useReadListsByTokenQuery,
} from 'app/store/list/list.api'
import type { RootState } from 'app/store'
import uuid from 'react-uuid'

const initialState: IListState = {
	allLists: [
		{
			_id: 'WEGSDGDS',
			title: 'HFGHGFH',
			color: 'blue',
			tasksId: [''],
			userId: 'FHDHDFH',
		},
	],
	activeList: [
		{
			_id: 'SAGSAGSAG',
			title: 'GFJGFJ',
			color: 'blue',
			tasksId: [''],
			userId: 'FGJFDJDF',
		},
	],
	showAllLists: true,
	colors: ColorsList,
}

// сделать нормальное описание листа возможно скопировать с какого нибудь приложения
const emptyList = [
	{
		_id: 'tguhjirftg',
		title: 'test title',
		color: 'blue',
		tasksId: [''],
		userId: '',
	},
]

export const listSlice = createSlice({
	name: 'listSlice',
	initialState,
	reducers: {
		// get all lists from localStorage
		getLists: (state, action: PayloadAction<null>) => {
			const LocalStorage_allLists =
				localStorage.getItem('allListsTrial') || emptyList
			// @ts-ignore
			state.allListsTrial = JSON.parse(LocalStorage_allLists)
		},

		// save all lists to localStorage
		addList: (
			state,
			action: PayloadAction<{
				title: string
				color: string
				userId: string
			}>
		) => {
			listSlice.actions.getLists()

			const newList = {
				_id: uuid(),
				title: action.payload.title,
				color: action.payload.color,
				tasksId: [''],
				userId: action.payload.userId,
			}
			// state.allListsTrial.push(newList)
			// localStorage.setItem('allListsTrial', JSON.stringify(state.allListsTrial))

			useCreateListQuery({
				title: action.payload.title,
				color: action.payload.color,
				userId: action.payload.userId,
			})
		},

		// show only 1 list
		setList: (state, action: PayloadAction<{ listId: string }>) => {
			const activeList = state.allLists.filter(
				item => item._id === action.payload.listId
			)
			state.activeList = activeList
			state.showAllLists = false
		},
		deleteList: (state, action: PayloadAction<{ listId: string }>) => {
			// useDeleteListQuery({
			// 	listId: action.payload.listId,
			// })
		},
		// show all lists
		showAllLists: (state, action: PayloadAction<{}>) => {
			state.showAllLists = true
		},

		// 		GET_LIST = 'LISTS/GET_LIST',
		// 		EDIT_LIST = 'LISTS/EDIT_LIST',
		// 		DELETE_LIST = 'LISTS/DELETE_LIST',
	},
	extraReducers: builder => {
		// Auto update all lists from server (when use request to server)
		builder.addMatcher(
			listApi.endpoints.readListsByToken.matchFulfilled,
			(state, { payload }) => {
				state.allLists = payload.lists
			}
		)
	},
})

export default listSlice.reducer

export const listReducer = listSlice.reducer
export const listActions = listSlice.actions

export const selectCurrentList = (state: RootState) => state.user.activeUser

// 	extraReducers: builder => {
// 		builder.addMatcher(
// 			listApi.endpoints.readListsByUserId.matchFulfilled,
// 			(state, { payload }) => {
// state.showAllLists=true

// 				console.log(payload)
// 				// state.token = payload.token
// 				// state.activeUser.email = payload.email
// 				// state.activeUser.id = payload.userId
// 				// state.activeUser.username = payload.userId
// 				// localStorage.setItem('token', payload.token)
// 			}
// 		),

// 	},

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

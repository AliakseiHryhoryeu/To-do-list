import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import uuid from 'react-uuid'

import type { RootState } from 'app/store'
import { listApi } from 'app/store/list/list.api'

import { IListState, ColorsList } from './list.types'

const initialState: IListState = {
	allLists: [],
	activeList: [],
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
		// show only 1 list
		setList: (state, action: PayloadAction<{ listId: string }>) => {
			const activeList = state.allLists.filter(
				item => item._id === action.payload.listId
			)
			state.activeList = activeList
			state.showAllLists = false
		},

		// show all lists
		showAllLists: (state, action: PayloadAction<{}>) => {
			state.showAllLists = true
		},
		// save all lists to localStorage
		// addList: (
		// 	state,
		// 	action: PayloadAction<{
		// 		title: string
		// 		color: string
		// 		userId: string
		// 	}>
		// ) => {
		// 	listSlice.actions.getLists()

		// 	const newList = {
		// 		_id: uuid(),
		// 		title: action.payload.title,
		// 		color: action.payload.color,
		// 		tasksId: [''],
		// 		userId: action.payload.userId,
		// 	}
		// 	// state.allListsTrial.push(newList)
		// 	// localStorage.setItem('allListsTrial', JSON.stringify(state.allListsTrial))

		// 	// useCreateListQuery({
		// 	// 	title: action.payload.title,
		// 	// 	color: action.payload.color,
		// 	// 	userId: action.payload.userId,
		// 	// })
		// },
		deleteList: (state, action: PayloadAction<{ listId: string }>) => {
			// useDeleteListQuery({
			// 	listId: action.payload.listId,
			// })
		},
	},

	// Auto update our folders state
	extraReducers: builder => {
		builder.addMatcher(
			listApi.endpoints.createList.matchFulfilled,
			(state, { payload }) => {
				if (payload.list) {
					state.allLists.push(payload.list)
				}
			}
		),
			builder.addMatcher(
				listApi.endpoints.readListsByToken.matchFulfilled,
				(state, { payload }) => {
					if (payload.lists) {
						state.allLists = payload.lists
					}
				}
			),
			builder.addMatcher(
				listApi.endpoints.readList.matchFulfilled,
				(state, { payload }) => {
					if (payload.list) {
						state.allLists
							.filter(item => item._id === payload.list._id)
							.map(item => {
								item._id = payload.list._id
								item.color = payload.list.color
								item.tasksId = payload.list.tasksId
								item.title = payload.list.title
								item.userId = payload.list.userId
							})
					}
				}
			),
			builder.addMatcher(
				listApi.endpoints.updateList.matchFulfilled,
				(state, { payload }) => {
					if (payload.list) {
						state.allLists
							.filter(item => item._id === payload.list._id)
							.map(item => {
								item._id = payload.list._id
								item.color = payload.list.color
								item.tasksId = payload.list.tasksId
								item.title = payload.list.title
								item.userId = payload.list.userId
							})
					}
				}
			),
			builder.addMatcher(
				listApi.endpoints.deleteList.matchFulfilled,
				(state, { payload }) => {
					if (payload.lists) {
						state.allLists = payload.lists
					}
				}
			)
	},
})

export default listSlice.reducer

export const listReducer = listSlice.reducer
export const listActions = listSlice.actions

export const selectCurrentList = (state: RootState) => state.user.activeUser

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import uuid from 'react-uuid'

import type { RootState } from 'app/store'
import { userApi } from 'app/store/user/user.api'
import { listApi } from 'app/store/list/list.api'
import { taskSlice } from './../task/task.slice'
import { userSlice } from './../user/user.slice'

import { IListState, ColorsList } from './list.types'

const LocalStorage_allLists = JSON.parse(localStorage.getItem('allLists'))
const emptyLists = []

const initialState: IListState = {
	allLists: LocalStorage_allLists || emptyLists,
	activeListId: '',
	showAllLists: true,
	colors: ColorsList,
}

const example = [
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
		setList: (state, action: PayloadAction<{ listId: string }>) => {
			state.activeListId = action.payload.listId
			state.showAllLists = false
		},

		// show all lists
		showAllLists: (state, action: PayloadAction<{}>) => {
			state.showAllLists = true
		},

		// ================== //
		// === Trial Mode === //
		// ================== //
		createLocalList: (
			state,
			action: PayloadAction<{ title: string; color: string }>
		) => {
			const newList = {
				_id: uuid(),
				title: action.payload.title,
				color: action.payload.color,
				tasksId: [],
				userId: '',
			}
			state.allLists.push(newList)
			localStorage.setItem('allLists', JSON.stringify(state.allLists))
		},

		updateLocalList: (
			state,
			action: PayloadAction<{ listId: string; title: string }>
		) => {
			state.allLists.find(list => list._id === action.payload.listId).title =
				action.payload.title
			localStorage.setItem('allLists', JSON.stringify(state.allLists))
		},

		updatepushTaskToList: (
			state,
			action: PayloadAction<{ taskId: string; listId: string }>
		) => {
			const list = state.allLists.find(
				list => list._id === action.payload.listId
			)
			if (list) {
				state.allLists
					.find(list => list._id === action.payload.listId)
					.tasksId.push(action.payload.taskId)
				localStorage.setItem('allLists', JSON.stringify(state.allLists))
			}
		},
		deleteLocalList: (state, action: PayloadAction<{ listId: string }>) => {
			state.activeListId = ''
			state.showAllLists = true

			const newState = state.allLists.filter(
				list => list._id !== action.payload.listId
			)
			state.allLists = newState
			localStorage.setItem('allLists', JSON.stringify(state.allLists))
		},
	},

	// Auto update our folders state
	extraReducers: builder => {
		// ================= //
		// === Lists Api === //
		// ================= //
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
				listApi.endpoints.authReadListsByToken.matchFulfilled,
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
								item.color = payload.list.color
								item.tasksId = payload.list.tasksId
								item.title = payload.list.title
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
								item.color = payload.list.color
								item.tasksId = payload.list.tasksId
								item.title = payload.list.title
							})
					}
				}
			),
			builder.addMatcher(
				listApi.endpoints.deleteList.matchFulfilled,
				(state, { payload }) => {
					if (payload.lists) {
						state.activeListId = ''
						state.showAllLists = true
						state.allLists = payload.lists
					}
				}
			),
			// ================ //
			// === User Api === //
			// ================ //
			builder.addMatcher(
				userApi.endpoints.login.matchFulfilled,
				(state, { payload }) => {
					state.allLists = payload.lists
				}
			),
			builder.addMatcher(
				userApi.endpoints.auth.matchFulfilled,
				(state, { payload }) => {
					state.allLists = payload.lists
				}
			),
			builder.addMatcher(
				userSlice.actions.logout.match,
				(state, { payload }) => {
					state.allLists = initialState.allLists
				}
			),
			// ================== //
			// === Trial Mode === //
			// ================== //
			builder.addMatcher(
				taskSlice.actions.createLocalTask.match,
				(state, { payload }) => {
					state.allLists
						.find(list => list._id === payload.listId)
						.tasksId.push(payload.taskId)
				}
			),
			builder.addMatcher(
				taskSlice.actions.deleteLocalTask.match,
				(state, { payload }) => {
					const newAllLists = state.allLists.filter(
						list =>
							list.tasksId.find(taskId => taskId === payload.taskId) !==
							payload.taskId
					)
					state.allLists = newAllLists
				}
			)
	},
})

export default listSlice.reducer

export const listReducer = listSlice.reducer
export const listActions = listSlice.actions

export const selectCurrentList = (state: RootState) => state.user.activeUser

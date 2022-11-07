import { listSlice } from './../list/list.slice'
import { userSlice } from './../user/user.slice'
import uuid from 'react-uuid'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
// import uuid from 'react-uuid'

import { taskApi } from './task.api'

import { ITaskState, ITask } from './task.types'
import { userApi } from '../user/user.api'

const LocalStorageFolder = 'allTasks'
const LocalStorage_allTasks = JSON.parse(
	localStorage.getItem(LocalStorageFolder)
)

const initialState: ITaskState = {
	allTasks: LocalStorage_allTasks || [],
}

export const taskSlice = createSlice({
	name: 'task',
	initialState,
	reducers: {
		createLocalTask: (
			state,
			action: PayloadAction<{ taskId: string; listId: string; text: string }>
		) => {
			const newList = {
				_id: action.payload.taskId,
				text: action.payload.text,
				completed: false,
				listId: action.payload.listId,
				userId: '',
			}
			state.allTasks.push(newList)
			localStorage.setItem(LocalStorageFolder, JSON.stringify(state.allTasks))
		},
		updateLocalTask: (
			state,
			action: PayloadAction<{
				taskId: string
				text: string
				completed: boolean
			}>
		) => {
			state.allTasks.find(task => task._id === action.payload.taskId).text =
				action.payload.text

			state.allTasks.find(
				task => task._id === action.payload.taskId
			).completed = action.payload.completed

			localStorage.setItem(LocalStorageFolder, JSON.stringify(state.allTasks))
		},
		deleteLocalTask: (state, action: PayloadAction<{ taskId: string }>) => {
			const newState = state.allTasks.filter(
				task => task._id !== action.payload.taskId
			)
			state.allTasks = newState
			localStorage.setItem(LocalStorageFolder, JSON.stringify(state.allTasks))
		},
	},
	extraReducers: builder => {
		// ================= //
		// === Tasks Api === //
		// ================= //
		builder.addMatcher(
			taskApi.endpoints.readTasksByToken.matchFulfilled,
			(state, { payload }) => {
				if (payload.tasks) {
					state.allTasks = payload.tasks
				}
			}
		),
			builder.addMatcher(
				taskApi.endpoints.createTask.matchFulfilled,
				(state, { payload }) => {
					if (payload.task) {
						state.allTasks.push(payload.task)
					}
				}
			),
			builder.addMatcher(
				taskApi.endpoints.readTasksByToken.matchFulfilled,
				(state, { payload }) => {
					if (payload.tasks) {
						state.allTasks = payload.tasks
					}
				}
			),
			builder.addMatcher(
				taskApi.endpoints.authReadTasksByToken.matchFulfilled,
				(state, { payload }) => {
					if (payload.tasks) {
						state.allTasks = payload.tasks
					}
				}
			),
			builder.addMatcher(
				taskApi.endpoints.readTask.matchFulfilled,
				(state, { payload }) => {
					if (payload.task) {
						state.allTasks
							.filter(item => item._id === payload.task._id)
							.map(item => {
								item.completed = payload.task.completed
								item.listId = payload.task.listId
								item.text = payload.task.text
								item.userId = payload.task.userId
							})
					}
				}
			),
			builder.addMatcher(
				taskApi.endpoints.updateTask.matchFulfilled,
				(state, { payload }) => {
					if (payload.task) {
						state.allTasks
							.filter(item => item._id === payload.task._id)
							.map(item => {
								item.completed = payload.task.completed
								item.listId = payload.task.listId
								item.text = payload.task.text
							})
					}
				}
			),
			builder.addMatcher(
				taskApi.endpoints.deleteTask.matchFulfilled,
				(state, { payload }) => {
					if (payload.tasks) {
						state.allTasks = payload.tasks
					}
				}
			),
			// ================ //
			// === User Api === //
			// ================ //
			builder.addMatcher(
				userApi.endpoints.login.matchFulfilled,
				(state, { payload }) => {
					state.allTasks = payload.tasks
				}
			),
			builder.addMatcher(
				userApi.endpoints.auth.matchFulfilled,
				(state, { payload }) => {
					state.allTasks = payload.tasks
				}
			),
			builder.addMatcher(
				userSlice.actions.logout.match,
				(state, { payload }) => {
					state = initialState
				}
			),
			// ================== //
			// === Trial Mode === //
			// ================== //
			builder.addMatcher(
				listSlice.actions.deleteLocalList.match,
				(state, { payload }) => {
					const newAllTasks = state.allTasks.filter(
						task => task.listId !== payload.listId
					)
					state.allTasks = newAllTasks
				}
			)
	},
})

export const taskReducer = taskSlice.reducer
export const taskActions = taskSlice.actions

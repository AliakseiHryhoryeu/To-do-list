import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
// import uuid from 'react-uuid'

import { taskApi } from './task.api'

import { ITaskState, ITask } from './task.types'

const initialState: ITaskState = {
	allTasks: [
		{
			_id: '',
			text: '',
			completed: false,
			listId: '',
			userId: '',
		},
	],
}

const emptyTask = [
	{
		_id: 'sagsag',
		text: 'sagasg',
		completed: false,
		listId: 'sagasg',
		userId: 'asgsag',
	},
]

export const taskSlice = createSlice({
	name: 'task',
	initialState,
	reducers: {
		// get all lists from localStorage
		getTasks: (state, action: PayloadAction<null>) => {
			const LocalStorage_allLists =
				localStorage.getItem('allListsTrial') || emptyTask
			// @ts-ignore
			state.allListsTrial = JSON.parse(LocalStorage_allLists)
		},
	},
	extraReducers: builder => {
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
			)
	},
})

export const taskReducer = taskSlice.reducer
export const taskActions = taskSlice.actions

// save all lists to localStorage
// addTask: (
// 	state,
// 	action: PayloadAction<{
// 		text: string
// 		listId: string
// 		userId: string
// 	}>
// ) => {
// 	taskSlice.actions.getTasks()

// 	const newTask = {
// 		_id: uuid(),
// 		text: 'sagasg',
// 		completed: false,
// 		listId: action.payload.listId,
// 		userId: action.payload.userId,
// 	}
// 	// state.allTasksTrial.push(newTask)
// 	// localStorage.setItem('allListsTrial', JSON.stringify(state.allTasksTrial))

// 	// useCreateTaskQuery({
// 	// 	text: action.payload.text,
// 	// 	listId: action.payload.listId,
// 	// 	userId: action.payload.userId,
// 	// })
// },
// deleteTask: (state, action: PayloadAction<ITask>) => {
// 	state.allTasks.push(action.payload)
// },
// readTask: (state, action: PayloadAction<ITask>) => {
// 	state.allTasks.push(action.payload)
// },

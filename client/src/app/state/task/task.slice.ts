import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

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

export const getTask = createAsyncThunk('Task/get', async () => {
	// const res = await TutorialDataService.create({ title, description })
	const res = {
		data: '',
	}
	return res.data
})

export const taskSlice = createSlice({
	name: 'task',
	initialState,
	reducers: {
		addTask: (state, action: PayloadAction<ITask>) => {
			state.allTasks.push(action.payload)
		},
		editTask: (state, action: PayloadAction<ITask>) => {
			state.allTasks.push(action.payload)
		},
		deleteTask: (state, action: PayloadAction<ITask>) => {
			state.allTasks.push(action.payload)
		},
	},
	extraReducers: builder => {
		// getFaq: (state, action: PayloadAction<ITask>) => {
		// 	state.allTasks.push(action.payload)
		// },
		builder.addCase(getTask.pending, (state, action: PayloadAction<ITask>) => {
			console.log(action.payload)
			state.allTasks.push(action.payload)
		})
	},
})

export const taskReducer = taskSlice.reducer
export const taskActions = taskSlice.actions

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import TutorialDataService from '../services/tutorial.service'

// const initialState = []

// export const createTutorial = createAsyncThunk(
// 	'tutorials/create',
// 	async ({ title, description }) => {
// 		const res = await TutorialDataService.create({ title, description })
// 		return res.data
// 	}
// )

// export const retrieveTutorials = createAsyncThunk(
// 	'tutorials/retrieve',
// 	async () => {
// 		const res = await TutorialDataService.getAll()
// 		return res.data
// 	}
// )

// export const updateTutorial = createAsyncThunk(
// 	'tutorials/update',
// 	async ({ id, data }) => {
// 		const res = await TutorialDataService.update(id, data)
// 		return res.data
// 	}
// )

// export const deleteTutorial = createAsyncThunk(
// 	'tutorials/delete',
// 	async ({ id }) => {
// 		await TutorialDataService.delete(id)
// 		return { id }
// 	}
// )

// export const deleteAllTutorials = createAsyncThunk(
// 	'tutorials/deleteAll',
// 	async () => {
// 		const res = await TutorialDataService.deleteAll()
// 		return res.data
// 	}
// )

// export const findTutorialsByTitle = createAsyncThunk(
// 	'tutorials/findByTitle',
// 	async ({ title }) => {
// 		const res = await TutorialDataService.findByTitle(title)
// 		return res.data
// 	}
// )

// const tutorialSlice = createSlice({
// 	name: 'tutorial',
// 	initialState,
// 	extraReducers: {
// 		[createTutorial.fulfilled]: (state, action) => {
// 			state.push(action.payload)
// 		},
// 		[retrieveTutorials.fulfilled]: (state, action) => {
// 			return [...action.payload]
// 		},
// 		[updateTutorial.fulfilled]: (state, action) => {
// 			const index = state.findIndex(
// 				tutorial => tutorial.id === action.payload.id
// 			)
// 			state[index] = {
// 				...state[index],
// 				...action.payload,
// 			}
// 		},
// 		[deleteTutorial.fulfilled]: (state, action) => {
// 			let index = state.findIndex(({ id }) => id === action.payload.id)
// 			state.splice(index, 1)
// 		},
// 		[deleteAllTutorials.fulfilled]: (state, action) => {
// 			return []
// 		},
// 		[findTutorialsByTitle.fulfilled]: (state, action) => {
// 			return [...action.payload]
// 		},
// 	},
// })

// const { reducer } = tutorialSlice
// export default reducer

// export const faqReducer = (state = initialState, action) => {
// 	let index
// 	let newArray

// 	switch (action.type) {
// 		case FaqActionsTypes.GET_FAQ:
// 			return {
// 				...state,
// 				faqPosts: action.payload,
// 			}

// 		case FaqActionsTypes.ADD_FAQ:
// 			return {
// 				...state,
// 				faqPosts: [...state.faqPosts, { ...action.payload }],
// 			}
// 		case FaqActionsTypes.EDIT_FAQ:
// 			index = state.faqPosts.findIndex(faq => faq._id === action.payload._id)
// 			newArray = [...state.faqPosts]
// 			newArray[index] = action.payload
// 			return {
// 				...state,
// 				faqPosts: newArray,
// 			}

// 		case FaqActionsTypes.DELETE_FAQ:
// 			return {
// 				...state,
// 				faqPosts: action.payload,
// 			}
// 		default:
// 			return state
// 	}
// }

// import { RootState } from '../state-types-reducer'

// const defaultState: RootState.TasksState = {
// 	allTasks: [],
// }

// export const tasksReducer = (state = defaultState, action) => {
// 	switch (action.type) {
// 		case TasksActionsTypes.GET_TASKS:
// 			return {
// 				...state,
// 				allTasks: action.payload,
// 			}
// 		case TasksActionsTypes.ADD_TASK:
// 			return {
// 				...state,
// 				allTasks: [...state.allTasks, { ...action.payload }],
// 			}
// 		case TasksActionsTypes.EDIT_TASK:
// 			const index = state.allTasks.findIndex(
// 				list => list._id === action.payload._id
// 			)
// 			const newArray = [...state.allTasks]
// 			newArray[index] = action.payload
// 			return {
// 				...state,
// 				allTasks: newArray,
// 			}

// 		default:
// 			return state
// 	}
// }

// import { useMemo } from 'react'
// import { Dispatch, bindActionCreators } from 'redux'
// import axios from 'axios'

// import { ListsActions } from 'app/state/actions'
// import config from 'assets/config.json'

// export namespace TasksActions {
// 	export enum Type {
// 		GET_TASKS = 'TASKS/GET_TASKS',
// 		SET_TASKS = 'TASKS/SET_TASKS',
// 		ADD_TASK = 'TASKS/ADD_TASK',
// 		EDIT_TASK = 'TASKS/EDIT_TASK',
// 		DELETE_TASK = 'TASKS/DELETE_TASK',
// 	}

// 	export const getTasksByUserId = userId => {
// 		return async dispatch => {
// 			try {
// 				const response = await axios.get(
// 					config.proxy + `api/tasks/getTasksByUserId`,
// 					{
// 						params: {
// 							userId: userId,
// 						},
// 					}
// 				)
// 				dispatch({ type: Type.GET_TASKS, payload: response.data.response })
// 			} catch (e) {
// 				console.log(e)
// 			}
// 		}
// 	}

// 	export const getTasksByListId = listId => {
// 		return async dispatch => {
// 			try {
// 				const response = await axios.get(
// 					config.proxy + `api/tasks/getTasksByListId`,
// 					{
// 						params: {
// 							listId: listId,
// 						},
// 					}
// 				)
// 				dispatch({ type: Type.GET_TASKS, payload: response.data.lists })
// 			} catch (e) {
// 				console.log(e)
// 			}
// 		}
// 	}

// 	export const getTask = taskId => {
// 		return async dispatch => {
// 			try {
// 				const response = await axios.get(config.proxy + `api/tasks/getTask`, {
// 					params: {
// 						taskId: taskId,
// 					},
// 				})
// 				dispatch({ type: Type.GET_TASKS, payload: response.data.lists })
// 			} catch (e) {
// 				console.log(e)
// 			}
// 		}
// 	}

// 	export const addTask = (userId, listId, text) => {
// 		return async dispatch => {
// 			try {
// 				const response = await axios.post(config.proxy + `api/tasks/addTask`, {
// 					userId: userId,
// 					listId: listId,
// 					text: text,
// 				})
// 				dispatch({ type: Type.ADD_TASK, payload: response.data.task })
// 				dispatch(ListsActions.getLists(response.data.task.userId))
// 			} catch (e) {
// 				console.log(e)
// 			}
// 		}
// 	}

// 	export const editTask = (taskId, text, completed) => {
// 		return async dispatch => {
// 			try {
// 				const response = await axios.put(config.proxy + `api/tasks/editTask`, {
// 					taskId: taskId,
// 					text: text,
// 					completed: completed,
// 				})
// 				dispatch({ type: Type.EDIT_TASK, payload: response.data.task })
// 			} catch (e) {
// 				console.log(e)
// 			}
// 		}
// 	}

// 	export const deleteTask = taskId => {
// 		return async dispatch => {
// 			try {
// 				const response = await axios.put(
// 					config.proxy + `api/tasks/deleteTask`,
// 					{
// 						taskId: taskId,
// 					}
// 				)
// 				dispatch({ type: Type.DELETE_TASK, payload: response.data.response })
// 				dispatch(getTasksByUserId(response.data.response.userId))
// 			} catch (e) {
// 				console.log(e)
// 			}
// 		}
// 	}

// 	export function setTasks(listId) {
// 		return {
// 			type: Type.SET_TASKS,
// 			payload: listId,
// 		}
// 	}
// }

// export type TasksActions = Omit<typeof TasksActions, 'Type'>
// export const useTasksActions = (dispatch: Dispatch) => {
// 	const { Type, ...actions } = TasksActions
// 	return useMemo(
// 		() => bindActionCreators(actions as any, dispatch),
// 		[dispatch]
// 	) as TasksActions
// }

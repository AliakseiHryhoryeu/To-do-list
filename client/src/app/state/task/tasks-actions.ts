import { useMemo } from 'react'
import { Dispatch, bindActionCreators } from 'redux'
import axios from 'axios'

import { ListsActions } from 'app/state/actions'
import config from 'assets/config.json'

export namespace TasksActions {
	export enum Type {
		GET_TASKS = 'TASKS/GET_TASKS',
		SET_TASKS = 'TASKS/SET_TASKS',
		ADD_TASK = 'TASKS/ADD_TASK',
		EDIT_TASK = 'TASKS/EDIT_TASK',
		DELETE_TASK = 'TASKS/DELETE_TASK',
	}

	export const getTasksByUserId = userId => {
		return async dispatch => {
			try {
				const response = await axios.get(
					config.proxy + `api/tasks/getTasksByUserId`,
					{
						params: {
							userId: userId,
						},
					}
				)
				dispatch({ type: Type.GET_TASKS, payload: response.data.response })
			} catch (e) {
				console.log(e)
			}
		}
	}

	export const getTasksByListId = listId => {
		return async dispatch => {
			try {
				const response = await axios.get(
					config.proxy + `api/tasks/getTasksByListId`,
					{
						params: {
							listId: listId,
						},
					}
				)
				dispatch({ type: Type.GET_TASKS, payload: response.data.lists })
			} catch (e) {
				console.log(e)
			}
		}
	}

	export const getTask = taskId => {
		return async dispatch => {
			try {
				const response = await axios.get(config.proxy + `api/tasks/getTask`, {
					params: {
						taskId: taskId,
					},
				})
				dispatch({ type: Type.GET_TASKS, payload: response.data.lists })
			} catch (e) {
				console.log(e)
			}
		}
	}

	export const addTask = (userId, listId, text) => {
		return async dispatch => {
			try {
				const response = await axios.post(config.proxy + `api/tasks/addTask`, {
					userId: userId,
					listId: listId,
					text: text,
				})
				dispatch({ type: Type.ADD_TASK, payload: response.data.task })
				dispatch(ListsActions.getLists(response.data.task.userId))
			} catch (e) {
				console.log(e)
			}
		}
	}

	export const editTask = (taskId, text, completed) => {
		return async dispatch => {
			try {
				const response = await axios.put(config.proxy + `api/tasks/editTask`, {
					taskId: taskId,
					text: text,
					completed: completed,
				})
				dispatch({ type: Type.EDIT_TASK, payload: response.data.task })
			} catch (e) {
				console.log(e)
			}
		}
	}

	export const deleteTask = taskId => {
		return async dispatch => {
			try {
				const response = await axios.put(
					config.proxy + `api/tasks/deleteTask`,
					{
						taskId: taskId,
					}
				)
				dispatch({ type: Type.DELETE_TASK, payload: response.data.response })
				dispatch(getTasksByUserId(response.data.response.userId))
			} catch (e) {
				console.log(e)
			}
		}
	}

	export function setTasks(listId) {
		return {
			type: Type.SET_TASKS,
			payload: listId,
		}
	}
}

export type TasksActions = Omit<typeof TasksActions, 'Type'>
export const useTasksActions = (dispatch: Dispatch) => {
	const { Type, ...actions } = TasksActions
	return useMemo(
		() => bindActionCreators(actions as any, dispatch),
		[dispatch]
	) as TasksActions
}

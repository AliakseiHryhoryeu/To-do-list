import { useMemo } from 'react'
import { Dispatch, bindActionCreators } from 'redux'
import axios from 'axios'

import config from 'assets/config.json'

export namespace ListsActions {
	export enum Type {
		GET_LISTS = 'LISTS/GET_LISTS',
		GET_LIST = 'LISTS/GET_LIST',
		SET_LIST = 'LISTS/SET_LIST',
		SHOW_ALL_LISTS = 'LISTS/SHOW_ALL_LISTS',
		ADD_LIST = 'LISTS/ADD_LIST',
		EDIT_LIST = 'LISTS/EDIT_LIST',
		DELETE_LIST = 'LISTS/DELETE_LIST',
	}

	export const getLists = userId => {
		return async dispatch => {
			try {
				const response = await axios.get(config.proxy + `api/lists/getLists`, {
					params: {
						userId: userId,
					},
				})
				dispatch({ type: Type.GET_LISTS, payload: response.data.lists })
			} catch (e) {
				console.log(e)
			}
		}
	}

	export const setList = listId => {
		return async dispatch => {
			try {
				const response = await axios.get(config.proxy + `api/lists/getList`, {
					params: {
						listId: listId,
					},
				})
				dispatch({ type: Type.SET_LIST, payload: response.data.list })
			} catch (e) {
				console.log(e)
			}
		}
	}

	export const showAllLists = () => {
		return async dispatch => {
			try {
				dispatch({ type: Type.SHOW_ALL_LISTS })
			} catch (e) {
				console.log(e)
			}
		}
	}

	export const addList = (userId, title, color) => {
		return async dispatch => {
			try {
				const response = await axios.post(config.proxy + `api/lists/addList`, {
					userId: userId,
					color: color,
					title: title,
				})
				dispatch({ type: Type.ADD_LIST, payload: response.data })
			} catch (e) {
				console.log(e)
			}
		}
	}

	export const editList = (listId, title) => {
		return async dispatch => {
			try {
				const response = await axios.put(config.proxy + `api/lists/editList`, {
					listId: listId,
					title: title,
				})
				dispatch({ type: Type.EDIT_LIST, payload: response.data.list })
			} catch (e) {
				console.log(e)
			}
		}
	}

	export const deleteList = listId => {
		return async dispatch => {
			try {
				const response = await axios.put(
					config.proxy + `api/lists/deleteList`,
					{
						listId: listId,
					}
				)
				dispatch({ type: Type.DELETE_LIST, payload: response.data.lists })
			} catch (e) {
				console.log(e)
			}
		}
	}
}

export type ListsActions = Omit<typeof ListsActions, 'Type'>
export const useListsActions = (dispatch: Dispatch) => {
	const { Type, ...actions } = ListsActions
	return useMemo(
		() => bindActionCreators(actions as any, dispatch),
		[dispatch]
	) as ListsActions
}

import axios from 'axios'

import { ListsActions, TasksActions } from 'app/actions'
import config from 'assets/config.json'

export namespace UserActions {
	export enum Type {
		SET_USER = 'USER/SET_USER',
		LOGOUT = 'USER/LOGOUT',
		SETTINGS_SHOW = 'USER/SETTINGS_SHOW',
		SETTINGS_HIDE = 'USER/SETTINGS_HIDE',
		SET_ACTIVE_USERICON = 'USER/SET_ACTIVE_USERICON',
		ALERT_SHOW = 'USER/ALERT_SHOW',
		ALERT_HIDE = 'USER/ALERT_HIDE',
	}

	export function auth() {
		return async dispatch => {
			try {
				const response = await axios.get(config.proxy + `api/auth/auth`, {
					headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
				})
				dispatch(setUser(response.data.user))
				dispatch(ListsActions.getLists(response.data.user.userId))
				dispatch(TasksActions.getTasksByUserId(response.data.user.userId))
				localStorage.setItem('token', response.data.token)
			} catch (e) {
				console.log(e.response.data.message)
			}
		}
	}

	export function signIn(username, password) {
		return async dispatch => {
			try {
				const response = await axios.post(config.proxy + `api/auth/login`, {
					username: username,
					password: password,
				})
				dispatch(setUser(response.data.user))
				localStorage.setItem('token', response.data.token)
				dispatch(ListsActions.getLists(response.data.user.userId))
				dispatch(TasksActions.getTasksByUserId(response.data.user.userId))
			} catch (e) {
				alert(e.response.data.message)
			}
		}
	}

	export async function registration(username, email, password) {
		try {
			const response = await axios.post(
				config.proxy + `api/auth/registration`,
				{
					username,
					email,
					password,
				}
			)
			alert(response.data.message)
		} catch (e) {
			alert(e.response.data.message)
		}
	}

	export function setUser(user) {
		return {
			type: Type.SET_USER,
			payload: user,
		}
	}
	export function logout() {
		return {
			type: Type.LOGOUT,
		}
	}

	export function showSettings() {
		return {
			type: Type.SETTINGS_SHOW,
		}
	}

	export function setActiveUserIcon(iconId) {
		return {
			type: Type.SET_ACTIVE_USERICON,
			payload: iconId,
		}
	}

	export function hideSettings() {
		return {
			type: Type.SETTINGS_HIDE,
		}
	}

	export function showAlert(text) {
		return dispatch => {
			dispatch({
				type: Type.ALERT_SHOW,
				payload: text,
			})
			setTimeout(() => {
				dispatch(hideAlert())
			}, 15000)
		}
	}

	export function hideAlert() {
		return {
			type: Type.ALERT_HIDE,
		}
	}
}

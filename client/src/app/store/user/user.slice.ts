import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { userApi } from './user.api'

import type { RootState } from 'app/store'

import { IUser, IUserState } from './user.types'

const initialState: IUserState = {
	activeUser: {
		userId: '',
		username: '',
	},
	token: null,
	settingsVisible: false,
	alert: null,
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		// setUser: (state, action: PayloadAction<IUser>) => {
		// 	state.activeUser.push(action.payload)
		// },
		// signUp: (state, action: PayloadAction<IUser>) => {
		// 	state.push(action.payload)
		// },
		// auth: (state, action: PayloadAction<IUser>) => {
		// 	state.push(action.payload)
		// },
		// login: (state, action: PayloadAction<IUser>) => {
		// 	state.push(action.payload)
		// },
	},
	extraReducers: builder => {
		builder.addMatcher(
			userApi.endpoints.login.matchFulfilled,
			(state, { payload }) => {
				state.token = payload.token
				state.activeUser = payload.user
			}
		)
	},
})

export default userSlice.reducer
export const userReducer = userSlice.reducer
export const userActions = userSlice.actions

export const selectCurrentUser = (state: RootState) => state.user.activeUser

// case UserActionsTypes.SET_USER:
// 	return {
// 		...state,
// 		activeUser: action.payload,
// 		isAuth: true,
// 	}
// case UserActionsTypes.LOGOUT:
// 	localStorage.removeItem('token')
// 	return {
// 		...state,
// 		activeUser: [],
// 		isAuth: false,
// 	}

// // import { RootState } from '../state-types-reducer'
// // import { UserActionsTypes } from 'app/models'

// const defaultState: RootState.UserState = {
// 	activeUser: {
// 		userId: '',
// 		username: '',
// 	},
// 	isAuth: false,
// 	settingsVisible: false,
// 	alert: null,
// }

// export const userReducer = (state = defaultState, action) => {
// 	switch (action.type) {
// 		case UserActionsTypes.SET_USER:
// 			return {
// 				...state,
// 				activeUser: action.payload,
// 				isAuth: true,
// 			}
// 		case UserActionsTypes.LOGOUT:
// 			localStorage.removeItem('token')
// 			return {
// 				...state,
// 				activeUser: [],
// 				isAuth: false,
// 			}
// 		case UserActionsTypes.SETTINGS_SHOW:
// 			return {
// 				...state,
// 				settingsVisible: true,
// 			}
// 		case UserActionsTypes.SET_ACTIVE_USERICON:
// 			return {
// 				...state,
// 				activeUser: { ...state.activeUser, userIcon: action.payload },
// 			}
// 		case UserActionsTypes.SETTINGS_HIDE:
// 			return {
// 				...state,
// 				settingsVisible: false,
// 			}
// 		case UserActionsTypes.ALERT_SHOW:
// 			return {
// 				...state,
// 				alert: action.payload,
// 			}
// 		case UserActionsTypes.ALERT_HIDE:
// 			return {
// 				...state,
// 				alert: null,
// 			}
// 		default:
// 			return state
// 	}
// }

// import axios from 'axios'

// import { ListsActions, TasksActions } from 'app/state/actions'
// import config from 'assets/config.json'

// export namespace UserActions {
// 	export enum Type {
// 		SET_USER = 'USER/SET_USER',
// 		LOGOUT = 'USER/LOGOUT',
// 		SETTINGS_SHOW = 'USER/SETTINGS_SHOW',
// 		SETTINGS_HIDE = 'USER/SETTINGS_HIDE',
// 		SET_ACTIVE_USERICON = 'USER/SET_ACTIVE_USERICON',
// 		ALERT_SHOW = 'USER/ALERT_SHOW',
// 		ALERT_HIDE = 'USER/ALERT_HIDE',
// 	}

// 	export function auth() {
// 		return async dispatch => {
// 			try {
// 				const response = await axios.get(config.proxy + `api/auth/auth`, {
// 					headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
// 				})
// 				dispatch(setUser(response.data.user))
// 				dispatch(ListsActions.getLists(response.data.user.userId))
// 				dispatch(TasksActions.getTasksByUserId(response.data.user.userId))
// 				localStorage.setItem('token', response.data.token)
// 			} catch (e) {
// 				console.log(e.response.data.message)
// 			}
// 		}
// 	}

// 	export function signIn(username, password) {
// 		return async dispatch => {
// 			try {
// 				const response = await axios.post(config.proxy + `api/auth/login`, {
// 					username: username,
// 					password: password,
// 				})
// 				dispatch(setUser(response.data.user))
// 				localStorage.setItem('token', response.data.token)
// 				dispatch(ListsActions.getLists(response.data.user.userId))
// 				dispatch(TasksActions.getTasksByUserId(response.data.user.userId))
// 			} catch (e) {
// 				alert(e.response.data.message)
// 			}
// 		}
// 	}

// 	export async function registration(username, email, password) {
// 		try {
// 			const response = await axios.post(
// 				config.proxy + `api/auth/registration`,
// 				{
// 					username,
// 					email,
// 					password,
// 				}
// 			)
// 			alert(response.data.message)
// 		} catch (e) {
// 			alert(e.response.data.message)
// 		}
// 	}

// 	export function setUser(user) {
// 		return {
// 			type: Type.SET_USER,
// 			payload: user,
// 		}
// 	}
// 	export function logout() {
// 		return {
// 			type: Type.LOGOUT,
// 		}
// 	}

// 	export function showSettings() {
// 		return {
// 			type: Type.SETTINGS_SHOW,
// 		}
// 	}

// 	export function setActiveUserIcon(iconId) {
// 		return {
// 			type: Type.SET_ACTIVE_USERICON,
// 			payload: iconId,
// 		}
// 	}

// 	export function hideSettings() {
// 		return {
// 			type: Type.SETTINGS_HIDE,
// 		}
// 	}

// 	export function showAlert(text) {
// 		return dispatch => {
// 			dispatch({
// 				type: Type.ALERT_SHOW,
// 				payload: text,
// 			})
// 			setTimeout(() => {
// 				dispatch(hideAlert())
// 			}, 15000)
// 		}
// 	}

// 	export function hideAlert() {
// 		return {
// 			type: Type.ALERT_HIDE,
// 		}
// 	}
// }
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from 'app/store'

import { userApi } from './user.api'
import { IUserState } from './user.types'

const initialState: IUserState = {
	activeUser: {
		id: '',
		email: '',
		username: '',
	},
	token: localStorage.getItem('token'),
	trialMode: true,
	settingsVisible: false,
	alert: false,
}

export const userSlice = createSlice({
	name: 'userSlice',
	initialState,
	reducers: {
		logout: (state, action: PayloadAction<null>) => {
			localStorage.removeItem('token')
			state.activeUser.email = ''
			state.activeUser.id = ''
			state.activeUser.username = ''
			state.settingsVisible = false
			state.token = ''
			state.trialMode = true
		},

		// Settings
		settingsShow: (state, action: PayloadAction<null>) => {
			state.settingsVisible = true
		},
		settingsHide: (state, action: PayloadAction<null>) => {
			state.settingsVisible = false
		},

		// Alerts
		alertShow: (state, action: PayloadAction<{ message: string }>) => {
			state.alert = action.payload.message
		},
		alertHide: (state, action: PayloadAction<null>) => {
			state.alert = false
		},
	},
	extraReducers: builder => {
		builder.addMatcher(
			userApi.endpoints.login.matchFulfilled,
			(state, { payload }) => {
				state.token = payload.token
				state.activeUser.email = payload.email
				state.activeUser.id = payload.userId
				state.activeUser.username = payload.username
				localStorage.setItem('token', payload.token)
				state.trialMode = false
			}
		),
			builder.addMatcher(
				userApi.endpoints.auth.matchFulfilled,
				(state, { payload }) => {
					state.token = payload.token
					state.activeUser.email = payload.email
					state.activeUser.id = payload.userId
					state.activeUser.username = payload.username
					localStorage.setItem('token', payload.token)
					state.trialMode = false
				}
			),
			builder.addMatcher(
				userApi.endpoints.signUp.matchFulfilled,
				(state, { payload }) => {
					state.token = payload.token
					state.activeUser.email = payload.email
					state.activeUser.id = payload.userId
					state.activeUser.username = payload.username
					localStorage.setItem('token', payload.token)
					state.trialMode = false
				}
			)
	},
})

export default userSlice.reducer
export const userReducer = userSlice.reducer
export const userActions = userSlice.actions

export const { logout, settingsHide, settingsShow, alertHide, alertShow } =
	userSlice.actions

export const selectCurrentUser = (state: RootState) => state.user.activeUser

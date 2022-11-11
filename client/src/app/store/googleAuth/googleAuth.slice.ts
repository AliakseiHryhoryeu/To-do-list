import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from 'app/store'

import { userApi } from './googleAuth.api'
import { IUserState } from './googleAuth.types'

const initialState: IUserState = {
	activeUser: {
		id: '',
		email: '',
		username: '',
	},
	token: localStorage.getItem('token'),
	trialMode: true,
	settingsVisible: false,
	alertVisible: true,
}

export const userSlice = createSlice({
	name: 'userSlice',
	initialState,
	reducers: {
		settingsShow: (state, action: PayloadAction<null>) => {
			state.settingsVisible = true
		},
		settingsHide: (state, action: PayloadAction<null>) => {
			state.settingsVisible = false
		},
	},
	extraReducers: builder => {
		builder.addMatcher(
			userApi.endpoints.login.matchFulfilled,
			(state, { payload }) => {
				state.token = payload.user.token
				state.activeUser.email = payload.user.email
				state.activeUser.id = payload.user.userId
				state.activeUser.username = payload.user.username
				localStorage.setItem('token', payload.user.token)
				state.trialMode = false
			}
		)
	},
})

export default userSlice.reducer
export const userReducer = userSlice.reducer
export const userActions = userSlice.actions

export const {} = userSlice.actions

export const selectCurrentUser = (state: RootState) => state.user.activeUser

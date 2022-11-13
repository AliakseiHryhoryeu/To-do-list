import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from 'app/store'

import { userApi } from './googleAuth.api'
import { IUserState } from './googleAuth.types'

const initialState: IUserState = {
	clientId: localStorage.getItem('token'),
	refreshToken: 'true',
}

export const userSlice = createSlice({
	name: 'userSlice',
	initialState,
	reducers: {
		settingsShow: (state, action: PayloadAction<null>) => {
			state.refreshToken = 'true'
		},
		settingsHide: (state, action: PayloadAction<null>) => {
			state.refreshToken = 'false'
		},
	},
	extraReducers: builder => {
		builder.addMatcher(
			userApi.endpoints.login.matchFulfilled,
			(state, { payload }) => {
				state.refreshToken = ''
			}
		)
	},
})

export default userSlice.reducer
export const userReducer = userSlice.reducer
export const userActions = userSlice.actions

export const {} = userSlice.actions

export const selectCurrentUser = (state: RootState) => state.user.activeUser

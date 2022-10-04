import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useLazyQuery, gql } from '@apollo/client'

import {
	IUser,
	IUserState,
	AuthState,
	AuthStateEnum,
	ILoggedWithInfo,
} from './user.types'
import type { TypeRootState } from '../'

// The slice's name and the key of the localStorage
const SLICE_NAME = 'auth'
const IS_LOGGED_ITEM_KEY = `store-${SLICE_NAME}-isLogged`

// localStorage will store if client store the HttpOnly cookie `JWT` to get
// the authentication. If it is is true, we will try to connect to server to
// get user's information. (So it will be loading soon)

const initialState = ((): AuthState => {
	const isLogged = !!localStorage.getItem(IS_LOGGED_ITEM_KEY)
	return isLogged
		? {
				state: AuthStateEnum.LoggedWithoutInfo,
		  }
		: {
				state: AuthStateEnum.Unlogged,
		  }
})()

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		// Sign out, just remove data from localStorage.
		signOut: (state: AuthState) => {
			localStorage.removeItem(IS_LOGGED_ITEM_KEY)
			state.state = AuthStateEnum.Unlogged
		},

		// Really signed, and set the current user's data into localStorage
		signInWithInfo: (
			_state: AuthState,
			actions: PayloadAction<Omit<ILoggedWithInfo, 'state'>>
		) => {
			localStorage.setItem(IS_LOGGED_ITEM_KEY, 'true')
			return {
				state: AuthStateEnum.LoggedWithInfo,
				...actions.payload,
			} as ILoggedWithInfo
		},
		// Just change the state to `signInAndLoading`.
		signInAndLoading: (state: AuthState) => {
			localStorage.removeItem(IS_LOGGED_ITEM_KEY)
			state.state = AuthStateEnum.LoggedAndLoadingInfo
		},
		// Just change the state to `signInWithoutInfo`.
		signInWithoutInfo: (state: AuthState) => {
			localStorage.removeItem(IS_LOGGED_ITEM_KEY)
			state.state = AuthStateEnum.LoggedWithoutInfo
		},

		// setUser: (state, action: PayloadAction<IUser>) => {
		// 	state.push(action.payload)
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
})

export default userSlice.reducer
export const userReducer = userSlice.reducer
export const userActions = userSlice.actions

// const initialState: IUserState = {
// 	activeUser: {
// 		userId: '',
// 		username: '',
// 		feedbacksId: [],
// 		faqId: [],
// 	},
// 	isAuth: false,
// }

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

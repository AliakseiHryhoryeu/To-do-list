import { RootState } from 'app/store'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUser } from './user.types'

const serverIp = process.env.SERVER_IP
const baseUrl = serverIp + 'api/user'

export interface UserResponse {
	token: string
	email: string
	userId: string
	username: string
}

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({
		baseUrl: baseUrl,
		prepareHeaders: (headers, { getState }) => {
			// const token = (getState() as RootState).user.token

			const token = localStorage.getItem('token')
			if (token) {
				headers.set('authorization', `Bearer ${token}`)
			}
			return headers
		},
	}),
	endpoints: build => ({
		// SIGN UP
		signUp: build.query<
			IUser,
			{ email: string; username: string; password: string }
		>({
			query: ({ email, password, username }) => ({
				url: `${baseUrl}/signup`,
				method: 'POST',
				body: {
					email: email,
					password: password,
					username: username,
				},
			}),
		}),

		// LOGIN
		login: build.query<UserResponse, { email: string; password: string }>({
			query: items => ({
				url: `${baseUrl}/login`,
				method: 'POST',
				body: {
					email: items.email,
					password: items.password,
				},
			}),
		}),

		// AUTH
		auth: build.query<UserResponse, { token: string }>({
			query: ({ token }) => ({
				url: `${baseUrl}/auth`,
				method: 'GET',
				// params: {
				// 	token: token,
				// },
			}),
		}),
	}),
})

export const { useSignUpQuery, useLoginQuery, useAuthQuery } = userApi
export const userApiActions = userApi.internalActions

// logout: build.query<IUser[], string>({
// 	query: (faqId: string = '') => `getFaq?faqId=${faqId}`,
// }),
// setUser: build.query<IUser[], string>({
// 	query: (faqId: string = '') => `getFaq?faqId=${faqId}`,
// }),

// export function auth() {
// 	return async dispatch => {
// 		try {
// 			const response = await axios.get(serverIp + `api/auth/auth`, {
// 				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
// 			})
// 			dispatch(setUser(response.data.user))
// 			localStorage.setItem('token', response.data.token)
// 		} catch (e) {
// 			console.log(e.response.data.message)
// 		}
// 	}
// }

// export function LogIn(username: string, password: string) {
// 	return async dispatch => {
// 		try {
// 			const response = await axios.post(serverIp + `api/auth/login`, {
// 				username: username,
// 				password: password,
// 			})
// 			dispatch(setUser(response.data.user))
// 			localStorage.setItem('token', response.data.token)
// 		} catch (e) {
// 			alert(e.response.data.message)
// 		}
// 	}
// }

// export async function signUp(username, email, password) {
// 	try {
// 		const response = await axios.post(serverIp + `api/auth/signup`, {
// 			username,
// 			email,
// 			password,
// 		})
// 		alert(response.data.message)
// 	} catch (e) {
// 		alert(e.response.data.message)
// 	}
// }

// export function setUser(user) {
// 	return {
// 		type: Type.SET_USER,
// 		payload: user,
// 	}
// }

// export function logout() {
// 	return {
// 		type: Type.LOGOUT,
// 	}
// }

import { RootState } from 'app/store'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUser } from './user.types'

const serverIp = 'https://todo-8877.herokuapp.com/'
const baseUrl = serverIp + 'api/auth'

export interface UserResponse {
	user: IUser
	token: string
}

export interface LoginRequest {
	email: string
	password: string
}

export const userApi = createApi({
	reducerPath: 'faqApi',
	baseQuery: fetchBaseQuery({
		baseUrl: baseUrl,
		prepareHeaders: (headers, { getState }) => {
			// By default, if we have a token in the store, let's use that for authenticated requests
			const token = (getState() as RootState).user.token
			if (token) {
				headers.set('authorization', `Bearer ${token}`)
			}
			return headers
		},
	}),

	endpoints: build => ({
		signUp: build.query<IUser, { email; password; username }>({
			query: ({ email, password, username }) => {
				return {
					url: `${baseUrl}/signup`,
					params: {
						email: email,
						password: password,
						username: username,
					},
				}
			},
		}),

		login: build.mutation<UserResponse, LoginRequest>({
			query: items => ({
				url: `${baseUrl}/login`,
				method: 'POST',
				body: items,
			}),
		}),
		auth: build.query<IUser[], { token }>({
			query: ({ token }) => {
				return {
					url: `${baseUrl}/auth`,
					params: {
						token: token,
					},
				}
			},
		}),
		protected: build.mutation<{ message: string }, void>({
			query: () => 'protected',
		}),
		// logout: build.query<IUser[], string>({
		// 	query: (faqId: string = '') => `getFaq?faqId=${faqId}`,
		// }),
		// setUser: build.query<IUser[], string>({
		// 	query: (faqId: string = '') => `getFaq?faqId=${faqId}`,
		// }),
	}),
})

export const {
	useSignUpQuery,
	useLoginMutation,
	useProtectedMutation,
	useAuthQuery,
} = userApi

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

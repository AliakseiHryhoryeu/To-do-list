import { createApi } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'

import { IUser } from './user.types'
import { SIGNUP } from 'app/graphql/mutations/users'
import { LOGIN, AUTH } from 'app/graphql/queries/users'

const serverIp = process.env.SERVER_IP
const baseUrl = serverIp

export const userApi = createApi({
	reducerPath: 'faqApi',
	baseQuery: graphqlRequestBaseQuery({ url: baseUrl }),
	endpoints: build => ({
		signUp: build.query<IUser[], { email; password; username; EmailSpam }>({
			query: ({ email, password, username, EmailSpam }) => ({
				document: SIGNUP,
				variables: {
					email,
					password,
					username,
					EmailSpam,
				},
			}),
		}),
		auth: build.query<IUser[], { token }>({
			query: ({ token }) => ({
				document: AUTH,
				variables: {
					token,
				},
			}),
		}),
		login: build.query<IUser[], { emailOrEmail: string; password: string }>({
			query: ({ emailOrEmail, password }) => ({
				document: LOGIN,
				variables: {
					emailOrEmail,
					password,
				},
			}),
		}),
		logout: build.query<IUser[], string>({
			query: (faqId: string = '') => `getFaq?faqId=${faqId}`,
		}),
		setUser: build.query<IUser[], string>({
			query: (faqId: string = '') => `getFaq?faqId=${faqId}`,
		}),
	}),
})

export const {
	useAuthQuery,
	useLoginQuery,
	useSignUpQuery,
	useSetUserQuery,
	useLogoutQuery,
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

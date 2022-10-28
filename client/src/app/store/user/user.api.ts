import { RootState } from 'app/store'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUser } from './user.types'

const serverIp = process.env.SERVER_IP
const baseUrl = serverIp + 'api/user'

export interface UserResponse {
	userId: string
	email: string
	username: string
	token: string
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
		signUp: build.query<UserResponse, { email: string; password: string }>({
			query: ({ email, password }) => ({
				url: `${baseUrl}/signup`,
				method: 'POST',
				body: {
					email: email,
					password: password,
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
			query: () => ({
				url: `${baseUrl}/auth`,
				method: 'GET',
			}),
		}),
	}),
})

export const { useSignUpQuery, useLoginQuery, useAuthQuery } = userApi
export const userApiActions = userApi.internalActions

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { RootState } from 'app/store'

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
			const token = (getState() as RootState).user.token
			if (token) {
				headers.set('authorization', `Bearer ${token}`)
			}
			return headers
		},
	}),
	endpoints: build => ({
		// SIGN UP
		signUp: build.mutation<UserResponse, { email: string; password: string }>({
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
		login: build.mutation<UserResponse, { email: string; password: string }>({
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
		auth: build.query<UserResponse, {}>({
			query: () => ({
				url: `${baseUrl}/auth`,
				method: 'GET',
			}),
		}),
	}),
})

export const { useSignUpMutation, useLoginMutation, useAuthQuery } = userApi
export const userApiActions = userApi.internalActions

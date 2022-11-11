import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IList } from '../list/list.types'
import { ITask } from '../task/task.types'

import { RootState } from 'app/store'

const serverIp = process.env.SERVER_IP
const baseUrl = serverIp + 'api/user'

export interface IUserResponse {
	userId: string
	email: string
	username: string
	token: string
}

export interface IAuthResponse {
	user: IUserResponse
	lists: IList[]
	tasks: ITask[]
}

export interface ILoginResponse {
	user: IUserResponse
	lists: IList[]
	tasks: ITask[]
}

export interface ISignUpResponse {
	user: IUserResponse
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
		// AUTH
		auth: build.query<IAuthResponse, {}>({
			query: () => ({
				url: `${baseUrl}/auth`,
				method: 'GET',
			}),
		}),
		// LOGIN
		login: build.mutation<ILoginResponse, { email: string; password: string }>({
			query: items => ({
				url: `${baseUrl}/login`,
				method: 'POST',
				body: {
					email: items.email,
					password: items.password,
				},
			}),
		}),
	}),
})

export const { useLoginMutation, useAuthQuery } = userApi
export const userApiActions = userApi.internalActions

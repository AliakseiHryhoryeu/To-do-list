import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { RootState } from 'app/store/index'

import { IList } from './list.types'

const serverIp = process.env.SERVER_IP
const baseUrl = serverIp + 'api/lists'

export interface allListsResponse {
	lists: IList[]
}

export interface ListResponse {
	list: IList
}

export const listApi = createApi({
	reducerPath: 'listApi',
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
	endpoints: builder => ({
		createList: builder.mutation<
			ListResponse,
			{ title: string; color: string }
		>({
			query: ({ title, color }) => ({
				url: `${baseUrl}/createlist`,
				method: 'POST',
				body: {
					title: title,
					color: color,
				},
			}),
		}),
		readListsByToken: builder.mutation<allListsResponse, {}>({
			query: () => ({
				url: `${baseUrl}/listsbyusertoken`,
				method: 'GET',
			}),
		}),
		authReadListsByToken: builder.query<allListsResponse, {}>({
			query: () => ({
				url: `${baseUrl}/listsbyusertoken`,
				method: 'GET',
			}),
		}),

		readList: builder.mutation<ListResponse, { listId: string }>({
			query: ({ listId }) => ({
				url: `${baseUrl}/list`,
				method: 'GET',
				params: { listId: listId },
			}),
		}),
		updateList: builder.mutation<
			ListResponse,
			{ listId: string; title: string }
		>({
			query: ({ listId, title }) => ({
				url: `${baseUrl}/updatelist`,
				method: 'PUT',
				body: { listId: listId, title: title },
			}),
		}),
		deleteList: builder.mutation<allListsResponse, { listId: string }>({
			query: ({ listId }) => ({
				url: `${baseUrl}/deletelist`,
				method: 'PUT',
				body: { listId: listId },
			}),
		}),
	}),
})

export const {
	useCreateListMutation,
	useReadListsByTokenMutation,
	useReadListMutation,
	useUpdateListMutation,
	useDeleteListMutation,
	useAuthReadListsByTokenQuery,
} = listApi

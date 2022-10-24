import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IList } from './list.types'
import { RootState } from 'app/store/index'

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
		createList: builder.query<
			ListResponse[],
			{ title: string; color: string; userId: string }
		>({
			query: ({ title, color, userId }) => ({
				url: `${baseUrl}/createlist`,
				method: 'POST',
				body: {
					title: title,
					color: color,
					userId: userId,
				},
			}),
		}),
		readListsByUserId: builder.query<allListsResponse, { userId: string }>({
			query: ({ userId }) => ({
				url: `${baseUrl}/listsbyuserid`,
				method: 'GET',
				params: { userId: userId },
			}),
		}),

		readList: builder.query<ListResponse, { listId: string }>({
			query: ({ listId }) => ({
				url: `${baseUrl}/list`,
				method: 'GET',
				params: { listId: listId },
			}),
		}),
		updateList: builder.query<
			allListsResponse[],
			{ listId: string; title: string }
		>({
			query: ({ listId, title }) => ({
				url: `${baseUrl}/updatelist`,
				body: { listId: listId, title: title },
			}),
		}),
		deleteList: builder.query<allListsResponse[], { listId: string }>({
			query: ({ listId }) => ({
				url: `${baseUrl}/deletelist`,
				body: { listId: listId },
			}),
		}),
	}),
})

export const {
	useCreateListQuery,
	useReadListsByUserIdQuery,
	useReadListQuery,
	useUpdateListQuery,
	useDeleteListQuery,
} = listApi

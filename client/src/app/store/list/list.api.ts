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
			const token = localStorage.getItem('token')

			// const token = (getState() as RootState).user.token
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
		readListsByToken: builder.query<allListsResponse, {}>({
			query: () => ({
				url: `${baseUrl}/listsbyusertoken`,
				method: 'GET',
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
	useReadListsByTokenQuery,
	useReadListQuery,
	useUpdateListQuery,
	useDeleteListQuery,
} = listApi

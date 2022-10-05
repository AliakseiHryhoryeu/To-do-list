import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IList } from './list.types'

const serverIp = 'https://todo-8877.herokuapp.com/'
const baseUrl = serverIp + 'api/lists'

export const listApi = createApi({
	reducerPath: 'listApi',
	baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
	endpoints: builder => ({
		createList: builder.query<
			IList[],
			{ title: string; color: string; userId: string }
		>({
			query: ({ title, color, userId }) => {
				return {
					url: `${baseUrl}/createlist`,
					params: {
						title: title,
						color: color,
						userId: userId,
					},
				}
			},
		}),
		readListsByUserId: builder.query<IList[], { userId: string }>({
			query: ({ userId }) => {
				return {
					url: `${baseUrl}/listsbyuserid`,
					params: { userId: userId },
				}
			},
		}),

		readList: builder.query<IList[], { listId: string }>({
			query: ({ listId }) => {
				return {
					url: `${baseUrl}/list`,
					params: { listId: listId },
				}
			},
		}),
		updateList: builder.query<
			IList[],
			{
				listId: string
				title: string
			}
		>({
			query: ({ listId, title }) => {
				return {
					url: `${baseUrl}/updatelist`,
					params: { listId: listId, title: title },
				}
			},
		}),
		deleteList: builder.query<IList[], { listId: string }>({
			query: ({ listId }) => {
				return {
					url: `${baseUrl}/deletelist`,
					params: { listId: listId },
				}
			},
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

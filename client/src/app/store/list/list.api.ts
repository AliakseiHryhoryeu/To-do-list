import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IList } from './list.types'

const serverIp = process.env.SERVER_IP
const baseUrl = serverIp + 'api/lists'

export const listApi = createApi({
	reducerPath: 'listApi',
	baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
	endpoints: builder => ({
		createList: builder.query<
			IList[],
			{ title: string; color: string; userId: string }
		>({
			query: ({ title, color, userId }) => ({
				url: `${baseUrl}/createlist`,
				body: {
					title: title,
					color: color,
					userId: userId,
				},
			}),
		}),
		readListsByUserId: builder.query<IList[], { userId: string }>({
			query: ({ userId }) => ({
				url: `${baseUrl}/listsbyuserid`,
				body: { userId: userId },
			}),
		}),

		readList: builder.query<IList[], { listId: string }>({
			query: ({ listId }) => ({
				url: `${baseUrl}/list`,
				body: { listId: listId },
			}),
		}),
		updateList: builder.query<IList[], { listId: string; title: string }>({
			query: ({ listId, title }) => ({
				url: `${baseUrl}/updatelist`,
				body: { listId: listId, title: title },
			}),
		}),
		deleteList: builder.query<IList[], { listId: string }>({
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

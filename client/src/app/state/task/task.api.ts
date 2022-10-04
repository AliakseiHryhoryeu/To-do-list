import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'

// import { CREATE_FAQ, UPDATE_FAQ, DELETE_FAQ } from 'app/graphql/mutations/faqs'
// import { READ_FAQS, READ_FAQ } from 'app/graphql/queries/faqs'
import { ITask } from './task.types'

const serverIp = 'https://todo-8877.herokuapp.com/'
const baseUrl = serverIp + 'api/auth'

export const taskApi = createApi({
	reducerPath: '',
	baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
	endpoints: builder => ({
		createFaq: builder.query<
			ITask[],
			{ text: string; completed: boolean; listId: string; userId: string }
		>({
			query: ({ text, completed, listId, userId }) => ``,
		}),
		readFaqs: builder.query<ITask[], string | void | null>({
			query: () => ({ document: READ_FAQS }),
		}),
		readFaq: builder.query<ITask, string>({
			query: id => ({
				document: READ_FAQ,
				variables: {
					id,
				},
			}),
		}),
		updateFaq: builder.query<
			ITask[],
			{ id: string; title: string; text: string; userId: string }
		>({
			query: ({ id, title, text, userId }) => ({
				document: UPDATE_FAQ,
				variables: {
					id,
					title,
					text,
					userId,
				},
			}),
		}),
		deleteFaq: builder.query<ITask[], string>({
			query: id => ({
				document: DELETE_FAQ,
				variables: {
					id,
				},
			}),
		}),
	}),
})

export const {
	useCreateFaqQuery,
	useReadFaqsQuery,
	useReadFaqQuery,
	useUpdateFaqQuery,
	useDeleteFaqQuery,
} = taskApi

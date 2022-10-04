import { createApi } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'

import { IFeedback } from './list.types'
import { READ_FEEDBACKS, READ_FEEDBACK } from 'app/graphql/queries/feedbacks'
import {
	CREATE_FEEDBACK,
	UPDATE_FEEDBACK,
	DELETE_FEEDBACK,
} from 'app/graphql/mutations/feedbacks'

const serverIp = process.env.SERVER_IP
const baseUrl = serverIp

export const listApi = createApi({
	reducerPath: 'listApi',
	baseQuery: graphqlRequestBaseQuery({ url: baseUrl }),
	endpoints: builder => ({
		readFeedbacks: builder.query<IFeedback[], string | void | null>({
			query: () => ({ document: READ_FEEDBACKS }),
		}),
		readFeedback: builder.query<IFeedback[], string | void | null>({
			query: () => ({ document: READ_FEEDBACK }),
		}),
		createFeedback: builder.query<
			IFeedback[],
			{ title: string; text: string; userId: string }
		>({
			query: ({ title, text, userId }) => ({
				document: CREATE_FEEDBACK,
				variables: {
					title,
					text,
					userId,
				},
			}),
		}),
		updateFeedback: builder.query<
			IFeedback[],
			{ id: string; title: string; text: string; userId: string }
		>({
			query: ({ id, title, text, userId }) => ({
				document: UPDATE_FEEDBACK,
				variables: {
					id,
					title,
					text,
					userId,
				},
			}),
		}),
		deleteFeedback: builder.query<IFeedback[], string>({
			query: id => ({
				document: DELETE_FEEDBACK,
				variables: {
					id,
				},
			}),
		}),
	}),
})

export const {
	useReadFeedbackQuery,
	useReadFeedbacksQuery,
	useCreateFeedbackQuery,
	useUpdateFeedbackQuery,
	useDeleteFeedbackQuery,
} = listApi

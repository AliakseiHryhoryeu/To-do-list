import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { ITask } from './task.types'
import { RootState } from 'app/store'

const serverIp = process.env.SERVER_IP
const baseUrl = serverIp + 'api/tasks'

export interface TasksResponse {
	tasks: ITask[]
}

export interface TaskResponse {
	task: ITask
}

export const taskApi = createApi({
	reducerPath: 'tasksApi',
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
		createTask: builder.mutation<
			TaskResponse,
			{ text: string; listId: string }
		>({
			query: ({ text, listId }) => ({
				url: `${baseUrl}/createtask`,
				method: 'POST',
				body: {
					text: text,
					listId: listId,
				},
			}),
		}),
		readTasksByToken: builder.mutation<TasksResponse, {}>({
			query: () => ({
				url: `${baseUrl}/tasksbyusertoken`,
				method: 'GET',
			}),
		}),
		authReadTasksByToken: builder.query<TasksResponse, {}>({
			query: () => ({
				url: `${baseUrl}/tasksbyusertoken`,
				method: 'GET',
			}),
		}),
		readTask: builder.mutation<TaskResponse, { taskId: string }>({
			query: ({ taskId }) => ({
				url: `${baseUrl}/task`,
				method: 'GET',
				params: { taskId: taskId },
			}),
		}),
		updateTask: builder.mutation<
			TaskResponse,
			{ taskId: string; text: string; completed: boolean }
		>({
			query: ({ taskId, text, completed }) => ({
				url: `${baseUrl}/updatetask`,
				method: 'PUT',
				body: { taskId: taskId, text: text, completed: completed },
			}),
		}),
		deleteTask: builder.mutation<TasksResponse, { taskId: string }>({
			query: ({ taskId }) => ({
				url: `${baseUrl}/deletetask`,
				method: 'PUT',
				body: { taskId: taskId },
			}),
		}),
	}),
})

export const {
	useCreateTaskMutation,
	useReadTasksByTokenMutation,
	useReadTaskMutation,
	useUpdateTaskMutation,
	useDeleteTaskMutation,
	useAuthReadTasksByTokenQuery,
} = taskApi

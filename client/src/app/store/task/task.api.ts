import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ITask } from './task.types'

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
			// const token = (getState() as RootState).user.token

			const token = localStorage.getItem('token')
			if (token) {
				headers.set('authorization', `Bearer ${token}`)
			}
			return headers
		},
	}),
	endpoints: builder => ({
		createTask: builder.query<
			TasksResponse,
			{ text: string; listId: string; userId: string }
		>({
			query: ({ text, listId, userId }) => ({
				url: `${baseUrl}/createtask`,
				body: {
					text: text,
					listId: listId,
					userId: userId,
				},
			}),
		}),
		readTasksByUserId: builder.query<TasksResponse, { userId: string }>({
			query: ({ userId }) => ({
				url: `${baseUrl}/tasksbyuserid`,
				body: { userId: userId },
			}),
		}),
		readTasksByListId: builder.query<TasksResponse, { listId: string }>({
			query: ({ listId }) => ({
				url: `${baseUrl}/tasksbylistid`,
				body: { listId: listId },
			}),
		}),
		readTask: builder.query<TasksResponse, { taskId: string }>({
			query: ({ taskId }) => ({
				url: `${baseUrl}/task`,
				body: { taskId: taskId },
			}),
		}),
		updateTask: builder.query<
			TasksResponse,
			{ taskId: string; text: string; completed: boolean }
		>({
			query: ({ taskId, text, completed }) => ({
				url: `${baseUrl}/updatetask`,
				body: { taskId: taskId, text: text, completed: completed },
			}),
		}),
		deleteTask: builder.query<TasksResponse, { taskId: string }>({
			query: ({ taskId }) => ({
				url: `${baseUrl}/deletetask`,
				body: { taskId: taskId },
			}),
		}),
	}),
})

export const {
	useCreateTaskQuery,
	useReadTasksByUserIdQuery,
	useReadTasksByListIdQuery,
	useReadTaskQuery,
	useUpdateTaskQuery,
	useDeleteTaskQuery,
} = taskApi

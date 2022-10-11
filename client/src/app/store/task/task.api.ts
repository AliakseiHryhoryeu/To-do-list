import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ITask } from './task.types'

const serverIp = process.env.SERVER_IP
const baseUrl = serverIp + 'api/tasks'

export const taskApi = createApi({
	reducerPath: '',
	baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
	endpoints: builder => ({
		createTask: builder.query<
			ITask[],
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
		readTasksByUserId: builder.query<ITask[], { userId: string }>({
			query: ({ userId }) => ({
				url: `${baseUrl}/tasksbyuserid`,
				body: { userId: userId },
			}),
		}),
		readTasksByListId: builder.query<ITask[], { listId: string }>({
			query: ({ listId }) => ({
				url: `${baseUrl}/tasksbylistid`,
				body: { listId: listId },
			}),
		}),
		readTask: builder.query<ITask[], { taskId: string }>({
			query: ({ taskId }) => ({
				url: `${baseUrl}/task`,
				body: { taskId: taskId },
			}),
		}),
		updateTask: builder.query<
			ITask[],
			{ taskId: string; text: string; completed: boolean }
		>({
			query: ({ taskId, text, completed }) => ({
				url: `${baseUrl}/updatetask`,
				body: { taskId: taskId, text: text, completed: completed },
			}),
		}),
		deleteTask: builder.query<ITask[], { taskId: string }>({
			query: ({ taskId }) => ({
				url: `${baseUrl}/deletetask`,
				body: { taskId: taskId },
			}),
		}),
	}),
})

export const {
	useReadTasksByUserIdQuery,
	useReadTasksByListIdQuery,
	useReadTaskQuery,
	useUpdateTaskQuery,
	useDeleteTaskQuery,
} = taskApi

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ITask } from './task.types'

const serverIp = 'https://todo-8877.herokuapp.com/'
const baseUrl = serverIp + 'api/tasks'

export const taskApi = createApi({
	reducerPath: '',
	baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
	endpoints: builder => ({
		createTask: builder.query<
			ITask[],
			{ text: string; listId: string; userId: string }
		>({
			query: ({ text, listId, userId }) => {
				return {
					url: `${baseUrl}/createtask`,
					params: {
						text: text,
						listId: listId,
						userId: userId,
					},
				}
			},
		}),
		readTasksByUserId: builder.query<ITask[], { userId: string }>({
			query: ({ userId }) => {
				return {
					url: `${baseUrl}/tasksbyuserid`,
					params: { userId: userId },
				}
			},
		}),
		readTasksByListId: builder.query<ITask[], { listId: string }>({
			query: ({ listId }) => {
				return {
					url: `${baseUrl}/tasksbylistid`,
					params: { listId: listId },
				}
			},
		}),
		readTask: builder.query<ITask[], { taskId: string }>({
			query: ({ taskId }) => {
				return {
					url: `${baseUrl}/task`,
					params: { taskId: taskId },
				}
			},
		}),
		updateTask: builder.query<
			ITask[],
			{
				taskId: string
				text: string
				completed: boolean
			}
		>({
			query: ({ taskId, text, completed }) => {
				return {
					url: `${baseUrl}/updatetask`,
					params: { taskId: taskId, text: text, completed: completed },
				}
			},
		}),
		deleteTask: builder.query<ITask[], { taskId: string }>({
			query: ({ taskId }) => {
				return {
					url: `${baseUrl}/deletetask`,
					params: { taskId: taskId },
				}
			},
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

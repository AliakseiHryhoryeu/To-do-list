import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { taskReducer } from './task/task.slice'
import { listReducer } from './list/list.slice'
import { userReducer } from './user/user.slice'

import { taskApi } from './task/task.api'
import { listApi } from './list/list.api'
import { userApi } from './user/user.api'

export const store = configureStore({
	reducer: {
		task: taskReducer,
		list: listReducer,
		user: userReducer,
		[taskApi.reducerPath]: taskApi.reducer,
		[listApi.reducerPath]: listApi.reducer,
		[userApi.reducerPath]: userApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(
			userApi.middleware,
			listApi.middleware,
			taskApi.middleware
		),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

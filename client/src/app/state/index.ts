import { configureStore } from '@reduxjs/toolkit'
import { taskReducer } from './task/task.slice'
import { listReducer } from './list/list.slice'
import { userReducer } from './user/user.slice'
import { userApi } from './user/user.api'
import { taskApi } from './task/task.api'
import { listApi } from './list/list.api'

export const store = configureStore({
	reducer: {
		user: userReducer,
		task: taskReducer,
		list: listReducer,
		[userApi.reducerPath]: userApi.reducer,
		[taskApi.reducerPath]: taskApi.reducer,
		[listApi.reducerPath]: listApi.reducer,
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(),
})

export type TypeRootState = ReturnType<typeof store.getState>

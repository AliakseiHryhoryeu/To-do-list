import { combineReducers } from 'redux'
import { RootState } from './state'
import { userReducer } from './user'
import { listsReducer } from './lists'
import { tasksReducer } from './tasks'

export { type RootState }


export const rootReducer = combineReducers<RootState>({
    user: userReducer,
    lists: listsReducer,
    tasks: tasksReducer
})



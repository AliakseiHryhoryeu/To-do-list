import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { userReducer } from '@reducers/userReducer'
import { listsReducer } from '@reducers/listsReducer'
import { tasksReducer } from '@reducers/tasksReducer'

const rootReducer = combineReducers({
    user: userReducer,
    lists: listsReducer,
    tasks: tasksReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))



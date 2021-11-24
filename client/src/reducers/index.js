import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import useReducer from './userReducer';

const rootReducer = combineReducers({
    user:useReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))



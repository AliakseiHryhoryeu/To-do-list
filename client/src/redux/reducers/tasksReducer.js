import { SET_TASKS, ADD_TASK, EDIT_TASK, DELETE_TASK } from '@redux/types';


const defaultState = {
    allTasks: {},
    curentTasks: {}

}

export function tasksReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_TASKS:
            return {
                ...state,
                allTasks: action.payload
            }
        case ADD_TASK:
            return {
                ...state
                    
            }
        case EDIT_TASK:
            return {
                ...state

            }
        case DELETE_TASK:
            return {
                ...state

            }
        default:
            return state
    }
}
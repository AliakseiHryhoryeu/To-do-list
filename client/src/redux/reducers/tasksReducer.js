import { GET_TASKS, ADD_TASK, EDIT_TASK, DELETE_TASK } from '@redux/types';


const defaultState = {
    allTasks: {},
    activeTasks: {}

}

export function tasksReducer(state = defaultState, action) {
    switch (action.type) {
        case GET_TASKS:
            return {
                ...state,
                allTasks: action.payload
            }
        case ADD_TASK:
            return {
                ...state,
                allTasks: [...state.allTasks, {...action.payload}]
                    
            }
        case EDIT_TASK:
            return {
                ...state,
                allTasks:action.payload

            }
        case DELETE_TASK:
            return {
                ...state,
                allTasks:action.payload
            }
        default:
            return state
    }
}
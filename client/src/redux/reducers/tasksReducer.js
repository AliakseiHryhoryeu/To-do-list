import { GET_TASKS, ADD_TASK, EDIT_TASK, DELETE_TASK } from '@redux/types';


const defaultState = {
    allTasks: {},

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
                allTasks: [...state.allTasks, { ...action.payload }]

            }
        case EDIT_TASK:
            const index = state.allTasks.findIndex(list => list._id === action.payload._id); //finding index of the item
            const newArray = [...state.allTasks]; //making a new array
            newArray[index] = action.payload //changing value in the new array
            return {
                ...state,
                allTasks: newArray,
            }

        default:
            return state
    }
}
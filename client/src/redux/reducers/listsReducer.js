import { GET_LISTS, SET_LIST, SHOW_ALL_LISTS, ADD_LIST, EDIT_LIST, DELETE_LIST } from '@redux/types';


const defaultState = {
    allLists: {},
    activeList: {},
    сolors: ["grey", "lime", "purple", "black", "red", "green", "blue", "pink"]
}

export function listsReducer(state = defaultState, action) {
    switch (action.type) {
        case GET_LISTS:
            return {
                ...state,
                allLists: action.payload
            }
        case SET_LIST:
            return {
                ...state,
                activeList: {...action.payload}
            }
        case SHOW_ALL_LISTS:
            return {
                ...state,
                activeList: null

            }
        case ADD_LIST:
            return {
                ...state,
                allLists: [...state.allLists, {...action.payload}]
            }
        case EDIT_LIST:
            return {
                ...state


            }
        case DELETE_LIST:
            return {
                ...state,
                allLists:action.payload

            }
        default:
            return state
    }
}
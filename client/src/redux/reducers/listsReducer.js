import { SET_LISTS, SET_LIST, ADD_LIST, EDIT_LIST, DELETE_LIST } from '@redux/types';


const defaultState = {
    allLists: {},
    curentList: {}

}

export function listsReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_LISTS:
            return {
                ...state,
                allLists: action.payload
            }
        case SET_LIST:
            return {
                ...state,
                currentList: {}
            }
        case ADD_LIST:
            return {
                ...state,
                currentList: {}
            }
        case EDIT_LIST:
            return {
                ...state


            }
        case DELETE_LIST:
            return {
                ...state


            }
        default:
            return state
    }
}
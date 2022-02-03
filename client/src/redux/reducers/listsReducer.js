import { GET_LISTS, SET_LIST, ADD_LIST, EDIT_LIST, DELETE_LIST } from '@redux/types';


const defaultState = {
    allLists: {},
    curentList: {},
    showAll:true

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
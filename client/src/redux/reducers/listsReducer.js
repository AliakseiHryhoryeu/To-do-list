import { GET_LISTS, SET_LIST, SHOW_ALL_LISTS, ADD_LIST, EDIT_LIST, DELETE_LIST, DELETE_TASK } from '@redux/types';


const defaultState = {
    allLists: {},
    activeList: {},
    showAll: true,
    сolors: ["grey", "lime", "purple", "black", "red", "green", "blue", "pink"]
}

export function listsReducer(state = defaultState, action) {
    let index
    let newArray

    switch (action.type) {
        case GET_LISTS:
            return {
                ...state,
                allLists: action.payload,
                activeList: action.payload
            }
        case SHOW_ALL_LISTS:
            return {
                ...state,
                activeList: state.allLists,
                showAll: true,

            }
        case SET_LIST:
            return {
                ...state,
                activeList: { ...action.payload },
                showAll: false,

            }
        case ADD_LIST:
            return {
                ...state,
                allLists: [...state.allLists, { ...action.payload }],
                activeList: [...state.allLists, { ...action.payload }]

            }
        case EDIT_LIST:
            index = state.allLists.findIndex(list => list._id === action.payload._id); //finding index of the item
            newArray = [...state.allLists]; //making a new array
            newArray[index] = action.payload //changing value in the new array
            return {
                ...state,
                allLists: newArray,
                activeList: newArray,
            }

        case DELETE_LIST:
            return {
                ...state,
                allLists: action.payload,
                activeList: action.payload,
                showAll: true,
            }
        case DELETE_TASK:
            index = state.allLists.findIndex(list => list._id === action.payload._id)
            newArray = [...state.allLists]
            newArray[index] = action.payload
            return {
                ...state,
                allLists: newArray,
                activeList: newArray,
            }
        default:
            return state
    }
}
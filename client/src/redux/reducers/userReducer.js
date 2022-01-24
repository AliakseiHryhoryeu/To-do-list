import { SET_USER, LOGOUT, SETTINGS_SHOW, SETTINGS_HIDE } from '@redux/types';


const defaultState = {
    curentUser: {},
    isAuth: false,
    settingsVisible: false,
    alertVisible: false
}

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true
            }
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                currentUser: {},
                isAuth: false
            }
        case SETTINGS_SHOW:
            return {
                ...state,
                settingsVisible: true
            }
        case SETTINGS_HIDE:
            return {
                ...state,
                settingsVisible: false
            }
        default:
            return state
    }
}
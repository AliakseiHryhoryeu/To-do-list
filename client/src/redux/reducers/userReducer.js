import { SET_USER, LOGOUT, SETTINGS_SHOW, SETTINGS_HIDE, ALERT_SHOW, ALERT_HIDE } from '@redux/types';


const defaultState = {
    curentUser: {},
    isAuth: false,
    settingsVisible: false,
    alert:null
}

export function userReducer(state = defaultState, action) {
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
        case ALERT_SHOW:
            return {
                ...state,
                alert: action.payload
            }
        case ALERT_HIDE:
            return {
                ...state,
                alert: null
            }
        default:
            return state
    }
}
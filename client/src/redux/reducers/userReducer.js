import { SET_USER, LOGOUT, SETTINGS_SHOW, SETTINGS_HIDE, ALERT_SHOW, ALERT_HIDE } from '@redux/types';

import img1 from '@img/userIcon_1.png'
import img2 from '@img/userIcon_2.png'
import img3 from '@img/userIcon_3.png'
import img4 from '@img/userIcon_4.png'
import img5 from '@img/userIcon_5.png'

const allUserIcons = [img1, img2, img3, img4, img5]

const defaultState = {
    currentUser: {
        id:'',
        username:'',
        userIcon:''
    },
    isAuth: false,
    settingsVisible: false,
    alert:null,
    
}

export function userReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                currentUser:  action.payload,
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
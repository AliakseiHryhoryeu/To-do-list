import { RootState } from './state';
import { UserActionsTypes } from 'app/models';

import img1 from '@img/userIcon_1.png'
import img2 from '@img/userIcon_2.png'
import img3 from '@img/userIcon_3.png'
import img4 from '@img/userIcon_4.png'
import img5 from '@img/userIcon_5.png'

const defaultState:RootState.UserState = {
    activeUser: {
        userId: '',
        username: '',
        userIcon: img1
        },
    isAuth: false,
    settingsVisible: false,
    alert: null,
    allUserIcons: [img1, img2, img3, img4, img5]
}

export function userReducer(state = defaultState, action) {
    switch (action.type) {
        case UserActionsTypes.SET_USER:
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true
            }
        case UserActionsTypes.LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                currentUser: {},
                isAuth: false
            }
        case UserActionsTypes.SETTINGS_SHOW:
            return {
                ...state,
                settingsVisible: true
            }
        case UserActionsTypes.SET_ACTIVE_USERICON:
            return {
                ...state,
                currentUser: {...state.activeUser, userIcon:action.payload}
            }
        case UserActionsTypes.SETTINGS_HIDE:
            return {
                ...state,
                settingsVisible: false
            }
        case UserActionsTypes.ALERT_SHOW:
            return {
                ...state,
                alert: action.payload
            }
        case UserActionsTypes.ALERT_HIDE:
            return {
                ...state,
                alert: null
            }
        default:
            return state
    }
}
import {
    SETTINGS_SHOW,
    SETTINGS_HIDE
} from '@store/types.js'
import { Action } from 'history'

const defaultState = {
    settingsShow = false
}


export default function settingsReducer() {

    switch (Action.type) {
        case SETTINGS_SHOW:
            return {
                ...state,
                settingsShow = true
            }
        case SETTINGS_HIDE:
            return {
                ...state,
                settingsShow = false
            }
        default:
            return state
    }
}


export const settingsShow = () => ({type:SETTINGS_SHOW}) 
export const settingsHide = () => ({type:SETTINGS_HIDE}) 
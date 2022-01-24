import axios from 'axios'
import { setUser } from "@reducers/userReducer";
import { SET_USER, LOGOUT, SETTINGS_SHOW, SETTINGS_HIDE } from '@redux/types';


import config from '@/config.json'


export function auth() {
    return async dispatch => {
        try {
            const response = await axios.get(config.proxy + `api/auth/auth`,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            )
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            console.log(e.response.data.message);
        }
    }
}

export function signIn(username, password) {
    return async dispatch => {
        try {
            const response = await axios.post(config.proxy + `api/auth/login`, {
                username,
                password
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}

export async function registration(username, email, password) {
    try {
        const response = await axios.post(config.proxy + `api/auth/registration`, {
            username,
            email,
            password
        })
        alert(response.data.message)
    } catch (e) {
        alert(e.response.data.message)
    }
}

export function setUser(user) {
    return {
        type: SET_USER,
        payload: user
    }
}
export function logout() {
    return {
        type: LOGOUT
    }
}

export function showSettings() {
    return {
        type: SETTINGS_SHOW
    }
}

export function hideSettings() {
    return {
        type: SETTINGS_HIDE
    }
}
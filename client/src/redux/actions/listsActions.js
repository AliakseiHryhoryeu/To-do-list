import axios from 'axios'
import { GET_LISTS, SET_LIST, ADD_LIST, EDIT_LIST, DELETE_LIST } from '@redux/types';


import config from '@/config.json'


export function getLists(userId) {
    return async dispatch => {
        try {
            const response = await axios.get(config.proxy + `api/lists/getLists`, {
                userId
            })
            console.log(response.data.lists)
            dispatch({type:GET_LISTS, payload:response.data.lists })
        } catch (e) {
            console.log(e)
        }
    }
}

export function getList(listId) {
    return async dispatch => {
        try {
            const response = await axios.get(config.proxy + `api/lists/getLists`, {
                listId
            })
            console.log(response.data.lists)
            dispatch({type:GET_LISTS, payload:response.data.lists })
        } catch (e) {
            console.log(e)
        }
    }
}

export function addList(listId) {
    return async dispatch => {
        try {
            const response = await axios.post(config.proxy + `api/lists/getLists`, {
                username,
                title,
                color
            })
            console.log(response.data.lists)
            dispatch({type:ADD_LIST, payload:response.data.lists })
        } catch (e) {
            console.log(e)
        }
    }
}


export function setList(listId) {
    return {
        type: SET_LIST,
        payload: listId
    }
}

// export function addList(list) {
//     return {
//         type: ADD_LIST,
//         payload: list
//     }
// }

export function editList(list) {
    return {
        type: EDIT_LIST,
        payload: list
    }
}

export function deleteList(list) {
    return {
        type: DELETE_LIST,
        payload: list
    }
}
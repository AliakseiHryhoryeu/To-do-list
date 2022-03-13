import axios from 'axios'
import { GET_LISTS, GET_LIST, SET_LIST, ADD_LIST, EDIT_LIST, DELETE_LIST } from '@redux/types';

import config from '@/config.json'


export function getLists(userId) {
    return async dispatch => {
        try {
            const response = await axios.get(config.proxy + `api/lists/getLists`, {
                params: {
                    'userId': userId
                }
            })
            dispatch({ type: GET_LISTS, payload: response.data.lists })
        } catch (e) {
            console.log(e)
        }
    }
}

export function getList(listId) {
    return async dispatch => {
        try {
            const response = await axios.get(config.proxy + `api/lists/getLists`, {
                params: {
                    'listId': listId
                }
            })
            dispatch({ type: GET_LIST, payload: response.data.lists })
        } catch (e) {
            console.log(e)
        }
    }
}

export function addList(userId, title, color) {
    return async dispatch => {
        try {
            const response = await axios.post(config.proxy + `api/lists/addList`, {
                'userId': userId,
                'color': color,
                'title': title
            })
            dispatch({ type: ADD_LIST, payload: response.data.lists })
        } catch (e) {
            console.log(e)
        }
    }
}

export function editList(listId, title, description, color) {
    return async dispatch => {
        try {
            const response = await axios.put(config.proxy + `api/lists/getLists`, {
                'listId': listId,
                'title': title,
                'description': description,
                'color': color
            })
            dispatch({ type: EDIT_LIST, payload: response.data.lists })
        } catch (e) {
            console.log(e)
        }
    }
}

export function deleteList(listId) {
    return async dispatch => {
        try {
            const response = await axios.put(config.proxy + `api/lists/getLists`, {
                'listId': listId
            })
            dispatch({ type: DELETE_LIST, payload: response.data.lists })
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

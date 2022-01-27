import axios from 'axios'
import { GET_LISTS, SET_LIST, ADD_LIST, EDIT_LIST, DELETE_LIST } from '@redux/types';


import config from '@/config.json'



export function getLists(lists) {
    return {
        type: GET_LISTS,
        payload: user
    }
}
export function setList(listId) {
    return {
        type: SET_LIST,
        payload: listId
    }
}

export function addList(list) {
    return {
        type: ADD_LIST,
        payload: list
    }
}

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
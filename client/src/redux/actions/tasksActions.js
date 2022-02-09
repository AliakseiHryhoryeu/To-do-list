import axios from 'axios'
import { GET_TASKS, SET_TASKS, ADD_TASK, EDIT_TASK, DELETE_TASK } from '@redux/types';

import config from '@/config.json'



export function getTasksByUserId(userId) {
    return async dispatch => {
        try {
            const response = await axios.get(config.proxy + `api/tasks/getTasksByUserId`, {
                userId
            })
            console.log(response.data.lists)
            dispatch({type:GET_TASKS, payload:response.data.lists })
        } catch (e) {
            console.log(e)
        }
    }
}

export function getTasksByListId(listId) {
    return async dispatch => {
        try {
            const response = await axios.get(config.proxy + `api/tasks/getTasksByListId`, {
                listId
            })
            console.log(response.data.lists)
            dispatch({type:GET_TASKS, payload:response.data.lists })
        } catch (e) {
            console.log(e)
        }
    }
}

export function addTask(listId, text) {
    return async dispatch => {
        try {
            const response = await axios.post(config.proxy + `api/tasks/addTask`, {
                listId,
                text
            })
            console.log(response.data.lists)
            dispatch({type:ADD_TASK, payload:response.data.lists })
        } catch (e) {
            console.log(e)
        }
    }
}

export function editTask(listId, text, completed) {
    return async dispatch => {
        try {
            const response = await axios.put(config.proxy + `api/tasks/editTask`, {
                listId,
                text,
                completed
            })
            console.log(response.data.lists)
            dispatch({type:EDIT_TASK, payload:response.data.lists })
        } catch (e) {
            console.log(e)
        }
    }
}

export function deleteTask(taskId) {
    return async dispatch => {
        try {
            const response = await axios.put(config.proxy + `api/lists/getLists`, {
                taskId
            })
            console.log(response.data.lists)
            dispatch({type:DELETE_TASK, payload:response.data.lists })
        } catch (e) {
            console.log(e)
        }
    }
}


export function setTasks(listId) {
    return {
        type: SET_TASKS,
        payload: listId
    }
}

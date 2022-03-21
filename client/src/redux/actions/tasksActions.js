import axios from 'axios'
import { GET_TASKS, SET_TASKS, ADD_TASK, EDIT_TASK, DELETE_TASK } from '@redux/types';

import { getLists } from './listsActions';

import config from '@/config.json'

// ++
export function getTasksByUserId(userId) {
    return async dispatch => {
        try {
            const response = await axios.get(config.proxy + `api/tasks/getTasksByUserId`, {
                params: {
                    'userId': userId
                }
            })
            dispatch({ type: GET_TASKS, payload: response.data.response })
        } catch (e) {
            console.log(e)
        }
    }
}

export function getTasksByListId(listId) {
    return async dispatch => {
        try {
            const response = await axios.get(config.proxy + `api/tasks/getTasksByListId`, {
                params: {
                    'listId': listId
                }
            })
            dispatch({ type: GET_TASKS, payload: response.data.lists })
        } catch (e) {
            console.log(e)
        }
    }
}

export function getTask(taskId) {
    return async dispatch => {
        try {
            const response = await axios.get(config.proxy + `api/tasks/getTask`, {
                params: {
                    'taskId': taskId
                }
            })
            dispatch({ type: GET_TASKS, payload: response.data.lists })
        } catch (e) {
            console.log(e)
        }
    }
}

export function addTask(userId, listId, text) {
    return async dispatch => {
        try {
            const response = await axios.post(config.proxy + `api/tasks/addTask`, {
                'userId':userId,
                'listId':listId,
                'text':text
            })
            dispatch({ type: ADD_TASK, payload: response.data.task })
            dispatch(getLists(response.data.task.userId))
        } catch (e) {
            console.log(e)
        }
    }
}

export function editTask(taskId, text, completed) {
    return async dispatch => {
        try {
            const response = await axios.put(config.proxy + `api/tasks/editTask`, {
                'taskId':taskId,
                'text':text,
                'completed':completed
            })
            dispatch({ type: EDIT_TASK, payload: response.data.task })

        } catch (e) {
            console.log(e)
        }
    }
}

export function deleteTask(taskId) {
    return async dispatch => {
        try {
            const response = await axios.put(config.proxy + `api/tasks/deleteTask`, {
                'taskId':taskId
            })
            dispatch({ type: DELETE_TASK, payload: response.data.response })
            dispatch(getTasksByUserId(response.data.response.userId))

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

import axios from 'axios'
import { GET_TASKS, SET_TASKS, ADD_TASK, EDIT_TASK, DELETE_TASK } from '@redux/types';

import config from '@/config.json'


export function setLists(tasks) {
    return {
        type: GET_TASKS,
        payload: user
    }
}
export function setTasks(listId) {
    return {
        type: SET_TASKS,
        payload: listId
    }
}

export function addTask(task) {
    return {
        type: ADD_TASK,
        payload: task
    }
}

export function editTask(task) {
    return {
        type: EDIT_TASK,
        payload: task
    }
}

export function deleteTask(task) {
    return {
        type: DELETE_TASK,
        payload: task
    }
}
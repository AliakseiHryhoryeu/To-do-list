import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { editTask, deleteTask } from '@actions/tasksActions';

import editTaskSvg from '@img/editTask.svg';
import deleteTaskSvg from '@img/deleteTask.svg';

import './Task.scss'

const Task = ({ allTasks, tasksId }) => {


  const dispatch = useDispatch()

  const editTextTask = (taskId, text, completed) => {
    const newText = window.prompt(`New task text`, text);
    if (newText) {
      dispatch(editTask(taskId, newText, completed))
    }
  }

  const checkTask = (taskId, text, completed) => {
    dispatch(editTask(taskId, text, !completed))
  }

  const delTask = (taskId) => {
    if (window.confirm('Are you sure you want delete this task?')) {
      dispatch(deleteTask(taskId))
    }
  }

  const renderTask = (taskId) => {

    try {
      let task = {}
      for (let i = 0; allTasks.length; i++) {
        if (allTasks[i]._id == taskId) {
          task = allTasks[i]
          break
        }
      }

      return (
        <div className="tasks__items-row">
          <div className="checkbox">
            <input
              onChange={() => checkTask(task._id, task.text, task.completed)}
              id={`task-${task._id}`}
              type="checkbox"
              checked={task.completed}
            />
            <label htmlFor={`task-${task._id}`}>
              <svg
                width="11"
                height="8"
                viewBox="0 0 11 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
                  stroke="#000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </label>
          </div>
          <p>{task.text}</p>
          <div className="tasks__items-row-actions">
            <div
              onClick={() => editTextTask(task._id, task.text, task.completed)}
            >
              <img
                src={editTaskSvg}
                alt="Edit icon"
              />
            </div>
            <div
              onClick={() => delTask(task._id)}
            >
              <img
                src={deleteTaskSvg}
                alt="Delete icon"
              />
            </div>
          </div>
        </div>
      )

    } catch (e) {
      console.log(e)
      return (
        <div className="tasks__items-row">
          <p>Tasks not found</p>
        </div>
      )
    }

  }

  return (
    <>
      {tasksId && tasksId.map(taskId => renderTask(taskId)
      )}
    </>
  )
}


export default Task
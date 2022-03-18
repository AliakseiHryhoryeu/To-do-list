import React, { useState } from 'react'
import { useDispatch, userDispatch } from 'react-redux'
import { editTask } from '@actions/tasksActions';

import editTaskSvg from '@img/editTask.svg';
import deleteTaskSvg from '@img/deleteTask.svg';

import './Task.scss'

export default function Task({ taskId, text, completed }) {

  const dispatch = useDispatch()

  const [checked, setChecked] = useState()


  const editTextTask = () => {
    const newText = window.prompt(`New task text`, text);
    if (newText) {
      dispatch(editTask(taskId, newText, completed))
    }

  }

  const deleteTask = () => {
    if (window.confirm('Are you sure you want delete this task?')) {
      dispatch(deleteTask(taskId))
    }
  }
  
  const checkTask = () => {
    dispatch(editTask(taskId, text, !checked))
    setChecked(!checked)
  }

  return (
    <div className="tasks__items-row">
      <div className="checkbox">
        <input
          onChange={() => checkTask()}
          id={`task-${taskId}`}
          type="checkbox"
          checked={checked}
        />
        <label htmlFor={`task-${taskId}`}>
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
      <p>text{text}</p>
      <div className="tasks__items-row-actions">
        <div >
          <img
            src={editTaskSvg}
            alt="Edit icon"
            onClick={() => editTextTask()}
          />
        </div>
        <div>
          <img
            src={deleteTaskSvg}
            alt="Delete icon"
            onClick={() => deleteTask()}
          />
        </div>
      </div>
    </div>
  )
}

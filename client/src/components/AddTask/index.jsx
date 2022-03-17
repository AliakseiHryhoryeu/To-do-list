import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { addTask } from '@actions/tasksActions'

import './AddTask.scss'

const AddTask = ({ listId }) => {
  const [visibleInput, setVisibleInput] = useState(false)
  const [inputValue, setInputValue] = useState('test')
  const dispatch = useDispatch()


  return (
    <div className='add-task'>
      {!visibleInput &&
        <div
          onClick={() => { setVisibleInput(!visibleInput) }}
          className="add-task__text"
        >
          <i>
            <svg width="16" height="12" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="listIconPlus">
              <path d="M8 1V15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M1 8H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </i>
          <span>Add Task</span>
        </div>
      }

      {visibleInput && <div className="add-task__input">
        <input
          className="field"
          type="text"
          placeholder="Name task..."
          defaultValue={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <div className="add-task__buttons ">
        <button className='btn-addtask'
          onClick={dispatch(addTask(listId, inputValue))}
        >
          Add Task
        </button>
        <button className='btn-cancel'
          onClick={() => { setVisibleInput(!visibleInput) }}
        >
          Cancel
        </button>

        </div>
      </div>
      }

    </div>
  )
}

export default AddTask
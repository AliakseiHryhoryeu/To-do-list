import React, { useState, FC } from 'react'
import { useDispatch } from 'react-redux'

import { TasksActions } from 'app/actions'

import './AddTask.scss'

type AddTaskProps = {
  userId: string,
  listId: string
}

export const AddTask: FC<AddTaskProps> = ({ userId, listId }) => {
  const [visibleInput, setVisibleInput] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const dispatch = useDispatch()

  const toggleVisibleInput = () => {
    setVisibleInput(!visibleInput)
  }

  const addNewTask = () => {
    dispatch(TasksActions.addTask(userId, listId, inputValue))
    setVisibleInput(!visibleInput)
    setInputValue('')
  }
  return (
    <div className='add-task'>
      {!visibleInput &&
        <div
          onClick={() => { toggleVisibleInput() }}
          className="add-task__text"
        >
          <i>
            <svg width="16" height="12" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="addtaskIconPlus">
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
            onClick={() => addNewTask()}
          >
            Add Task
          </button>

          <button className='btn-cancel'
            onClick={() => { toggleVisibleInput() }}
          >
            Cancel
          </button>

        </div>
      </div>
      }

    </div>
  )
}

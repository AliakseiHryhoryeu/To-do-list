import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TasksActions } from 'app/actions';

import editTaskSvg from 'assets/img/editTask.svg';
import deleteTaskSvg from 'assets/img/deleteTask.svg';

import './Task.scss'
import { RootState } from 'app/reducers';
import { TaskModel } from 'app/models';

type TaskProps = {
  tasks: TaskModel[]
}

export const Task: FC<TaskProps> = ({ tasks }) => {


  const dispatch = useDispatch()
  const { lists, allTasks, user } = useSelector((state: RootState) => {
    return {
      user: state.user.activeUser,
      lists: state.lists.activeList,
      allTasks: state.tasks.allTasks
    }
  })

  const editTextTask = (taskId, text, completed) => {
    const newText = window.prompt(`New task text`, text);
    if (newText) {
      dispatch(TasksActions.editTask(taskId, newText, completed))
    }
  }

  const checkTask = (taskId, text, completed) => {
    dispatch(TasksActions.editTask(taskId, text, !completed))
  }

  const delTask = (taskId) => {
    if (window.confirm('Are you sure you want delete this task?')) {
      dispatch(TasksActions.deleteTask(taskId))
    }
  }

  if (!tasks) {
    return (
      <></>
    )
  }
  return (
    <>
      {tasks.map(task => {
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

      }
      )}
    </>
  )
}


export default Task
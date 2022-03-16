import React, { useState } from 'react'

const AddTask = () => {
  const [visibleInput, setVisibleInput] = useState(false)


  return (
    <div className='add-task'>
      {!visibleInput && <ul onClick={() => { setVisibleInput(!visibleInput) }} className="">
        <li >
          <i><svg width="16" height="12" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="listIconPlus">
            <path d="M8 1V15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1 8H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          </i>
          <span>Add Task</span>
        </li>
      </ul>}

      <div className="add-task__input">
        <input type="text" defaultValue={'ddddddddddd'} />
        <button>
          Add Task
        </button>
        <button>
          Add Task
        </button>
      </div>

    </div>
  )
}

export default AddTask
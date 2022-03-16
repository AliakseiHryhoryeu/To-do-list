import React from 'react'
import editListSvg from '@img/editList.svg';

const TaskHeader=({title})=>{
  return (
    <div>
      <h2 className="tasks__title">
        title list {title}
        <img src={editListSvg} alt="Edit icon" />
      </h2>
    </div>
  )
}

export default  TaskHeader
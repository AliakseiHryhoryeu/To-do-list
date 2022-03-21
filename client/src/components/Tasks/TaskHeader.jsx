import React from 'react'
import editListSvg from '@img/editList.svg';
import { useDispatch } from 'react-redux';
import { editList } from '@actions/listsActions';

const TaskHeader = ({ listId, title, color }) => {
  const dispatch = useDispatch()


  const editTitle = () => {
    const newTitle = window.prompt(`New list title`, title);
    if (newTitle) {
      dispatch(editList(listId, newTitle))
    }
  };

  return (
    <div>
      <h2 className={`tasks__title title--${color}`}>
        {title}
        <img
          src={editListSvg}
          alt="Edit icon"
          onClick={() => editTitle()}
        />
      </h2>
    </div>
  )
}

export default TaskHeader
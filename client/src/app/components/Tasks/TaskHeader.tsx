import React, { FC } from 'react'
import { useDispatch } from 'react-redux'

import { ListsActions } from 'app/actions'
import editListSvg from 'assets/img/editList.svg'

type TaskHeaderProps = {
  listId: string,
  title: string,
  color: string
}

export const TaskHeader: FC<TaskHeaderProps> = ({ listId, title, color }) => {
  const dispatch = useDispatch()


  const editTitle = () => {
    const newTitle = window.prompt(`New list title`, title)
    if (newTitle) {
      dispatch(ListsActions.editList(listId, newTitle))
    }
  }

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

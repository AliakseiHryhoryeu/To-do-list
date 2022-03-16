import React from 'react'
import editListSvg from '@img/editList.svg';

export default function TaskHeader() {
  return (
    <div>
            <h2 className="tasks__title">
                Фронтенд
                <img src={editListSvg} alt="Edit icon" />
            </h2>
    </div>
  )
}

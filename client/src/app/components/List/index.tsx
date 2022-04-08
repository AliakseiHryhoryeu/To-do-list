import React, { FC } from 'react'
import { useDispatch, useSelector } from "react-redux"
import classNames from 'classnames'

import { Badge } from 'app/components'
import { ListsActions } from 'app/actions'
import { ListModel } from 'app/models'
import { RootState } from 'app/reducers'

import removeSvg from 'assets/img/remove.svg'

import './List.scss'

type ListProps = {
    lists: ListModel[]
}

export const List: FC<ListProps> = ({ lists }) => {
    const dispatch = useDispatch()
    const { activeList, showAllLists } = useSelector((state: RootState) => {
        return {
            activeList: state.lists.activeList,
            showAllLists: state.lists.showAllLists
        }
    })

    const removeList = (listId) => {
        if (window.confirm('Are you sure you want to delete the list?')) {
            dispatch(ListsActions.deleteList(listId))
        }
    }
    const setActiveList = (listId) => {
        dispatch(ListsActions.setList(listId))

    }

    const findActiveList = (listId) => {
        if (showAllLists) {
            return false
        }
        if (listId !== activeList[0]._id) {
            return false
        }
        return true
    }

    return (
        <ul className="main__list">
            {lists.map(list => {

                return (
                    <li
                        onClick={() => setActiveList(list._id)}
                        key={list._id}
                        className={classNames(findActiveList(list._id) ? 'active' : '')}
                    >
                        <i>{<Badge color={list.color} />}</i>
                        <span>{list.title}</span>
                        <img onClick={() => removeList(list._id)} className="main__list__remove-icon" src={removeSvg} alt="Remove icon" />
                    </li>
                )
            })}
        </ul>
    )
}

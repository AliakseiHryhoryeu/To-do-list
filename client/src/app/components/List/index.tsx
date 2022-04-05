import React,{FC} from 'react';
import { useDispatch } from "react-redux";
import classNames from 'classnames';
import {Badge} from 'app/components';
import { ListsActions } from 'app/actions';
import { ListModel } from 'app/models';

import removeSvg from '@img/remove.svg'

import './List.scss';

type ListProps={
    lists:ListModel[]
}

export const List:FC<ListProps> = ({ lists }) => {
    const dispatch = useDispatch()

    const removeList = (listId) => {
        if (window.confirm('Are you sure you want to delete the list?')) {
            dispatch(ListsActions.deleteList(listId))
        }
    }
    const setActiveList = (listId) => {
        dispatch(ListsActions.setList(listId))

    }
    

    return (
        <ul className="main__list">
            {lists.map(list=>{

                return(
                    <li
                    onClick={() => setActiveList(list._id)}
                    key={list._id}
                    className={classNames(activeListId === list._id ? 'active' : '')}
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

import React from 'react';
import { connect, useDispatch } from "react-redux";
import Badge from '@components/Badge';
import classNames from 'classnames';

import { setList, deleteList } from '@actions/listsActions';

import removeSvg from '@img/remove.svg'

import './List.scss';

function List(props) {
    const dispatch = useDispatch()

    let items = props.allLists
    const removeList = (listId) => {
        if (window.confirm('Are you sure you want to delete the list?')) {
            dispatch(deleteList(listId))
        }
    }
    const setActiveList = (listId) => {
        dispatch(setList(listId))

    }

    const renderList = () => {
        let item = []

        for (let i = 0; i < items.length; i++) {
            const activeListId = props.activeListId
            const temp = (
                <li 
                onClick={() => setActiveList(items[i]._id)} 
                key={items[i]._id}
                className={classNames( activeListId === items[i]._id ? 'active': ''  )}
                >
                    <i>{<Badge color={items[i].color} />}</i>
                    <span>{items[i].title}</span>
                    <img onClick={() => removeList(items[i]._id)} className="main__list__remove-icon" src={removeSvg} alt="Remove icon" />
                </li>
            )
            item.push(temp)
        }
        return item
    }

    return (
        <ul className="main__list">
            {renderList()}
        </ul>
    )
}

const mapStateToProps = state => ({
    allLists: state.lists.allLists,
    activeListId:state.lists.activeList._id
})

export default connect(mapStateToProps, null)(List)

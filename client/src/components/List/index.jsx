import React from 'react';
import { connect, useDispatch } from "react-redux";
import Badge from '@components/Badge';
import classNames from 'classnames';

import { setList, deleteList } from '@actions/listsActions';

import removeSvg from '@img/remove.svg'

import './List.scss';

function List(props) {
    const dispatch = useDispatch()

    const removeList = (listId) => {
        if (window.confirm('Are you sure you want to delete the list?')) {
            dispatch(deleteList(listId))
        }
    }
    const setActiveList = (listId) => {
        dispatch(setList(listId))

    }

    let allLists = props.allLists
    const renderList = () => {
        let response = []
        const activeListId = props.activeListId
        for (let i = 0; i < allLists.length; i++) {
            const temp = (
                <li 
                onClick={() => setActiveList(allLists[i]._id)} 
                key={allLists[i]._id}
                className={classNames( activeListId === allLists[i]._id ? 'active': ''  )}
                >
                    <i>{<Badge color={allLists[i].color} />}</i>
                    <span>{allLists[i].title}</span>
                    <img onClick={() => removeList(allLists[i]._id)} className="main__list__remove-icon" src={removeSvg} alt="Remove icon" />
                </li>
            )
            response.push(temp)
        }
        return response
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

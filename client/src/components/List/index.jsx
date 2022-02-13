import React, { useState, Children } from 'react';
import classNames from 'classnames';

import removeSvg from '@img/remove.svg'

import Badge from '@components/Badge';

import './List.scss';

const List = ({ items, isRemovable, onClick, onRemove }) => {

    const removeList = (item) => {
        if (window.confirm('Are you sure you want to delete the list?')) {
            console.log(item)
        }
    }
    const setActiveList = (key) => {
        console.log(key)
    }


    const renderList = () => {
        let item = []
        for (let i = 0; i < items.length; i++) {

            const temp = (
                <li onClick={() => setActiveList(items[i]._id)} key={items[i]._id}>
                    <i>{<Badge color={items[i].color} />}</i>
                    <span>{items[i].title}</span>
                    <img onClick={removeList} className="main__list__remove-icon" src={removeSvg} alt="Remove icon" />
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

export default List;

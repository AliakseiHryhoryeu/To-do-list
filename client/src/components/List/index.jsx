import React, { useState, Children } from 'react';
import classNames from 'classnames';

import removeSvg from '@img/remove.svg'

import Badge from '@components/Badge';

import './List.scss';

const List = ({ items, isRemovable, onClick, onRemove }) => {

    const removeList = (item) => {
        if (window.confirm('Are you sure you want to delete the list?')) {
            onRemove(item)
        }
    }
    const test = () => {
        items.map(item => {
            console.log(item)
        })
    }
    return (

        <ul onClick={test} className="main__list">
sgassaggsasg
        </ul>
    )
}

export default List;


{/* <ul onClick={test} className="main__list">
{
    items.map(item => (
        <li key={item.key} className={classNames(item.className, { 'active': item.active })}>
            <i>{item.icon ? item.icon : <Badge color={item.color} />}</i>
            <span>{item.name}</span>
            {isRemovable && <img onClick={removeList} className="main__list__remove-icon" src={removeSvg} alt="Remove icon" />}
        </li>
    ))
}

</ul> */}




{/* <ul className="main__list">
{
  props.allLists.map(item => (
    <li key={item._id} className="test">
      <i>{<Badge color={item.color} />}</i>
      <span>{item.title}</span>
      <img className="main__list__remove-icon" src={removeSvg} alt="Remove icon" />
    </li>
  ))
}

</ul> */}
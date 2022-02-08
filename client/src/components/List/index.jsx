import React, { useState, Children } from 'react';
import classNames from 'classnames';

import removeSvg from '@img/remove.svg'

import Badge from '@components/Badge';

import './List.scss';

const List = ({ items, isRemovable, onClick, onRemove }) => {

    const text = (<h1>565683256253692390823578
        sdtffggjghjkhjhjj
        111111111111</h1>)
    const removeList = (item) => {
        if (window.confirm('Are you sure you want to delete the list?')) {
            onRemove(item)
        }
    }
    const test = () => {
        console.log(items)
        let item = ''
        for (let i = 0; i < items.length; i++) {
            item += items[i]
        }
        console.log(item)
        return item


    }
    return (
        <ul onClick={test} className="main__list">
            {text}
            sgassaggsasg
            <span>span {test()}</span>
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
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


    const test = () => {
        console.log(items)
        let item = []
        for (let i = 0; i < items.length; i++) {

            const temp = (
                <li onClick={() => setActiveList(items[i]._id)} key={items[i]._id}>
                    <i>{<Badge color={items[i].color} />}</i>
                    <span>{items[i].title}</span>
                    <img onClick={removeList} className="main__list__remove-icon" src={removeSvg} alt="Remove icon" />
                </li>
            )
            console.log(temp)
            item.push(temp)
        }
        return item

    }



    return (
        <ul className="main__list">
            {test()}
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
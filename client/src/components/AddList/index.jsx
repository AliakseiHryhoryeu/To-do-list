import React, { useState } from 'react';
import classNames from 'classnames';

import List from '@components/List';
import Badge from '@components/Badge';

import './AddList.scss';
import closeSvg from '@img/close.svg';

const AddList = ({ colors }) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors[0].id);
  const [inputValue, setInputValue] = useState('');

  const addList = () => {
    if (!inputValue) {
      alert('Enter list name')
      return;
    }
    const color = colors.filter(color => color.id === selectedColor)[0].name;
    onAdd({ id: Math.random(), name: inputValue, color: color });
    setInputValue('')
    setSelectedColor(colors[0].id)
  }


  return (
    <div className="add-list">

      <ul onClick={() => { setVisiblePopup(!visiblePopup) }} className="main__list">
        <li >
          <i><svg width="16" height="12" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="listIconPlus">
            <path d="M8 1V15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1 8H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          </i>
          <span>Add List</span>
        </li>
      </ul>



      {visiblePopup && <div className="add-list__popup">
        <img onClick={() => setVisiblePopup(false)} src={closeSvg} alt="Close button" className="add-list__popup-close-btn"></img>
        <input onChange={e => setInputValue(e.target.value)} value={inputValue} className="field" type="text" placeholder="Folder Name" />
        <div className="add-list__popup-colors">
          {colors.map(color => (
            <Badge onClick={() => setSelectedColor(color.id)} key={color.id} color={color.name} className={selectedColor === color.id && 'active'} />
          ))}
        </div>
        <button onClick={addList} className="button">Add New List</button>
      </div>

      }
    </div>
  );
}


export default AddList;
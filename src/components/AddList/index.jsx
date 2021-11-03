import React from 'react';
import List from '../List';
import AddList from './AddList.scss'

const AddButtonList = () =>{
  return(

     <div className="add-list">
    <List items={[
      {
        icon:<svg width="16" height="12" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="listIconPlus">
<path d="M8 1V15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M1 8H15" stroke="black" strokeWidth="2" strokeLinecap="round" stroke-Lnejoin="round"/>
</svg>,
        name: 'Add List'
      }
    ]}
     />
     <div className="add-list__popup">

     </div>
     </div>
  );
}


export default AddButtonList;
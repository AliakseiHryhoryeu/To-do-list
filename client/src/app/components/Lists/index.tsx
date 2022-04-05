import React from 'react';
import {List,AddList} from "app/components";
import {AllListsBtn} from './AllListsBtn';

import './Lists.scss'

export const Lists = ()=> {

  return (
    <>
      <AllListsBtn />
      <List lists={lists} />
      <AddList />
    </>

  )
}

// export default Lists
import React from 'react';

import List from "@components/List";
import AddList from "@components/AddList";
import ListHeader from './ListHeader';

import './Lists.scss'

const Lists = ()=> {


  return (
    <>
      <ListHeader />
      <List />
      <AddList />
    </>

  )
}

export default Lists
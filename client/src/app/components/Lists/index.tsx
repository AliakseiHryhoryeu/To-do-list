import React, { FC } from 'react';
import { List, AddList } from "app/components";
import { AllListsBtn } from './AllListsBtn';

import { useSelector } from 'react-redux';
import { RootState } from 'app/reducers';
import './Lists.scss'

export const Lists: FC = () => {

  const { showAllLists, allLists, activeList } = useSelector((state: RootState) => {
    return {
      showAllLists:state.lists.showAllLists,
      allLists: state.lists.allLists,
      activeList: state.lists.activeList
    }
  })
  let lists = showAllLists? allLists : activeList
  
  return (
    <>
      <AllListsBtn />
      <List lists={allLists} />
      <AddList />
    </>

  )
}

// export default Lists
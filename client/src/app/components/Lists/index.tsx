import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { List, AddList } from "app/components";
import { RootState } from 'app/reducers';

import { AllListsBtn } from './AllListsBtn';

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

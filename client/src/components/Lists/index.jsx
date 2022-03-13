import React from 'react';
import {useDispatch} from 'react-redux'
import { addList } from '../../redux/actions/listsActions';

import List from "@components/List";
import AddList from "@components/AddList";
import ListHeader from './ListHeader';

import './Lists.scss'

const Lists = ()=> {

  const dispatch = useDispatch()

  return (
    <>
      <ListHeader />
      <List />
      <AddList />
    </>

  )
}

export default Lists
import React, { useState, Fragment } from 'react';
import { useDispatch, useSelector, connect } from "react-redux";
import { logout, showSettings, hideSettings, showAlert } from '@actions/userActions'

import List from "@components/List";
import AddList from "@components/AddList";
import ListHeader from './ListHeader';
import Badge from '@components/Badge';

import DB from "@db/db.json";

import removeSvg from '@img/remove.svg'

import './Lists.scss'

function Lists(props) {


  return (
    <Fragment>
      <ListHeader />
      <List items={props.allLists} />
      <AddList colors={DB.colors} />
    </Fragment>

  )
}


const mapStateToProps = state => ({
  userId: state.user.userId,
  allLists: state.lists.allLists,
  currentList: state.lists.curentList,
  image: state.user.currentUser.userIcon

})

const mapDispatchToProps = { showSettings, hideSettings }

export default connect(mapStateToProps, mapDispatchToProps)(Lists)

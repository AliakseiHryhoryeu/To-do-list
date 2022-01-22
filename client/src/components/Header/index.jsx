import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import {getState} from "redux";
import classNames from 'classnames';

import { auth } from "@actions/authActions";
import { logout } from "@reducers/userReducer";

import Settings from "@components/Settings";
import List from "@components/List";
import AddList from "@components/AddList";

import mainLogo from '@img/favicon.svg'
import userIcon from '@img/userIcon.png'
import settingsIcon from '@img/settingsIcon.svg'
import exitIcon from '@img/exitIcon.svg'

import DB from "@db/db.json";

import './Header.scss';

const Header = ({ }) => {
  const isAuth = useSelector(state => state.user.isAuth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(auth())
  }, [])

  console.log(getState)

  // responsive at mobile devices
  const [isActiveHeaderBurger, setActiveHeaderBurger] = useState(false)
  const [isActiveUsername, setActiveUsername] = useState(false)
  const toggleClassActiveHeaderBurger = () => {
    setActiveHeaderBurger(!isActiveHeaderBurger)
  }
  const toggleClassActiveUsername = () => {
    setActiveUsername(!isActiveUsername)
  }

  //lists
  const [lists, setLists] = useState(
    DB.lists.map((item) => {
      item.color = DB.colors.filter(
        (color) => color.id === item.colorId
      )[0].name;
      return item;
    })
  );

  const onAddList = (obj) => {
    const newList = [...lists, obj];
    setLists(newList);
  };

  return (
    <header className="header__wrapper">
      <header className="header">
        <div className="header__container">

          <div className={classNames("header__burger", { 'header__burger-active': isActiveHeaderBurger })} onClick={toggleClassActiveHeaderBurger}>
            <span></span>
          </div>
          <Link to="/" className="header__link">
            <img className="header__mainLogo" src={mainLogo} alt="mainLogo" />
            To do list
          </Link>

          {!isAuth && <nav className={classNames("header__nav", { 'header__nav-active': isActiveHeaderBurger })}>
            <ul className="header__nav__list">
              <li className="nav__item">
                <Link to="/registration" className="header__nav__link">Registration</Link>
              </li>
              <li className="header__nav__item">
                <Link to="/auth" className="header__nav__link">Sign in</Link>
              </li>
            </ul>
          </nav>}

          {isAuth && <nav className={classNames("header__nav", { 'header__nav-active': isActiveHeaderBurger })}>
            <ul className="header__nav__list-isAuth">
              <li className="header__nav__item header__nav__username" >

                <div className="header__nav__username__container" onClick={toggleClassActiveUsername}>
                  <div className="header__nav__link-white">Username</div>
                  <img src={userIcon} alt="userIcon" />
                </div>

                <div className={classNames("header__nav__username__content", { 'header__nav__username__content-active': isActiveUsername })}>
                  <div className="header__nav__username__item">
                    <img src={settingsIcon} alt="settingsIcon" />
                    <a href="/" className="header__nav__link-white" >Settings</a>
                  </div>
                  <div className="header__nav__username__item" onClick={() => dispatch(logout())}>
                    <img src={exitIcon} alt="exitIcon" />
                    <Link to="/" className="header__nav__link-white" >Logout</Link>
                  </div>
                </div>
              </li>

            </ul>
            <ul className="header__nav__list header__nav__list-tasks">
              <List
                items={[
                  {
                    icon: (<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" > <path d="M12.96 8.10001H7.74001C7.24321 8.10001 7.20001 8.50231 7.20001 9.00001C7.20001 9.49771 7.24321 9.90001 7.74001 9.90001H12.96C13.4568 9.90001 13.5 9.49771 13.5 9.00001C13.5 8.50231 13.4568 8.10001 12.96 8.10001V8.10001ZM14.76 12.6H7.74001C7.24321 12.6 7.20001 13.0023 7.20001 13.5C7.20001 13.9977 7.24321 14.4 7.74001 14.4H14.76C15.2568 14.4 15.3 13.9977 15.3 13.5C15.3 13.0023 15.2568 12.6 14.76 12.6ZM7.74001 5.40001H14.76C15.2568 5.40001 15.3 4.99771 15.3 4.50001C15.3 4.00231 15.2568 3.60001 14.76 3.60001H7.74001C7.24321 3.60001 7.20001 4.00231 7.20001 4.50001C7.20001 4.99771 7.24321 5.40001 7.74001 5.40001ZM4.86001 8.10001H3.24001C2.74321 8.10001 2.70001 8.50231 2.70001 9.00001C2.70001 9.49771 2.74321 9.90001 3.24001 9.90001H4.86001C5.35681 9.90001 5.40001 9.49771 5.40001 9.00001C5.40001 8.50231 5.35681 8.10001 4.86001 8.10001ZM4.86001 12.6H3.24001C2.74321 12.6 2.70001 13.0023 2.70001 13.5C2.70001 13.9977 2.74321 14.4 3.24001 14.4H4.86001C5.35681 14.4 5.40001 13.9977 5.40001 13.5C5.40001 13.0023 5.35681 12.6 4.86001 12.6ZM4.86001 3.60001H3.24001C2.74321 3.60001 2.70001 4.00231 2.70001 4.50001C2.70001 4.99771 2.74321 5.40001 3.24001 5.40001H4.86001C5.35681 5.40001 5.40001 4.99771 5.40001 4.50001C5.40001 4.00231 5.35681 3.60001 4.86001 3.60001Z" fill="black" /> </svg>),
                    name: "All Tasks",
                    active: true,
                  },
                ]}
              />
              <List
                items={lists}
                onRemove={(list) => {
                  console.log(list);
                }}
                isRemovable
              />
              <AddList onAdd={onAddList} colors={DB.colors} />


            </ul>

          </nav>}


        </div>
      </header>
    </header>

  );
};
export default Header

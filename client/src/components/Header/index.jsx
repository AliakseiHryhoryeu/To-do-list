import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { auth } from "@actions/authActions";
import { logout } from "@reducers/userReducer";

import classNames from 'classnames';

import mainLogo from '@img/favicon.svg'
import userIcon from '@img/userIcon.png'
import settingsIcon from '@img/settingsIcon.svg'
import exitIcon from '@img/exitIcon.svg'

import './Header.scss';

const Header = ({ }) => {
  const isAuth = useSelector(state => state.user.isAuth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(auth())
  }, [])


  // responsive at mobile devices
  const [isActiveHeaderBurger, setActiveHeaderBurger] = useState(false)
  const [isActiveUsername, setActiveUsername] = useState(false)
  const toggleClassActiveHeaderBurger = () => {
    setActiveHeaderBurger(!isActiveHeaderBurger)
  }
  const toggleClassActiveUsername = () => {
    setActiveUsername(!isActiveUsername)
  }
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
            <ul className="header__nav__list">
              <li className="header__nav__item header__nav__username">

                <div className="header__nav__username__container" onClick={toggleClassActiveUsername}>
                  <div className="header__nav__link">Username</div>
                  <img src={userIcon} alt="userIcon" />
                </div>


                <div className={classNames("header__nav__username__content", { 'header__nav__username__content-active': isActiveUsername })}>
                  <div className="header__nav__username__item">
                    <img src={settingsIcon} alt="settingsIcon" />
                    <a href="/" className="header__nav__link" >Settings</a>
                  </div>
                  <div className="header__nav__username__item" onClick={() => dispatch(logout())}>
                    <img src={exitIcon} alt="exitIcon" />
                    <Link to="/" className="header__nav__link" >Logout</Link>
                  </div>
                </div>
              </li>

            </ul>
          </nav>}


        </div>
      </header>
    </header>

  );
};
export default Header

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { auth } from "@actions/authActions";
import { logout } from "@reducers/userReducer";

import classNames from 'classnames';

import mainLogo from '@img/favicon.svg'
import userIcon from '@img/userIcon.png'

import './Header.scss';

const Header = ({ }) => {
  const isAuth = useSelector(state => state.user.isAuth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(auth())
  }, [])


  // responsive at mobile devices
  const [isActiveHeaderBurger, setActiveHeaderBurger] = useState(false)
  const toggleClassActive = () => {
    setActiveHeaderBurger(!isActiveHeaderBurger)
  }
  return (
    <header className="header__wrapper">
      <header className="header">
        <div className="header__container">

          <div className={classNames("header__burger", { 'active': isActiveHeaderBurger })} onClick={toggleClassActive}>
            <span></span>
          </div>
          <Link to="/" className="header__link">
            <img className="header__mainLogo" src={mainLogo} alt="mainLogo" />
            To do list
          </Link>

          {!isAuth && <nav className={classNames("header__nav", { 'active': isActiveHeaderBurger })}>
            <ul className="header__nav__list">
              <li className="nav__item">
                <Link to="/registration" className="header__nav__link">Registration</Link>
              </li>
              <li className="header__nav__item">
                <Link to="/auth" className="header__nav__link">Sign in</Link>
              </li>
            </ul>
          </nav>}

          {isAuth && <nav className={classNames("header__nav", { 'active': isActiveHeaderBurger })}>
            <div className="header__nav__list">
              <div className="header__nav__item header__nav__item-username">
                <div className="header__nav__username">
                  <div to="/" className="header__nav__link">Username</div>
                  <img src={userIcon} alt="userIcon" />
                </div>
                <div className="header__nav__username-content">
                  <div className="header__nav__item" onClick={() => dispatch(logout())}>
                    <Link to="/" className="header__nav__link" >Logout</Link>
                  </div>
                  <div className="header__nav__item">
                    <a href="/" className="header__nav__link" >Settings</a>
                  </div>
                </div>

              </div>
            </div>
          </nav>}


        </div>
      </header>
    </header>

  );
};
export default Header

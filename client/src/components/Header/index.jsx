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
  const [isActive, setActive] = useState(false)
  const toggleClassActive = () => {
    setActive(!isActive)
    console.log(isActive)
  }
  return (
    <header className="header__wrapper">
      <header className="header">
        <div className="header__container">

          <div className={classNames("header__burger", { 'active': isActive })} onClick={toggleClassActive}>
            <span></span>
          </div>
          <Link to="/" className="header__link">
            <img className="header__mainLogo" src={mainLogo} alt="mainLogo" />
            To do list
          </Link>

          <nav className={classNames("header__nav", { 'active': isActive })}>
            <ul className="header__nav__list">
              {!isAuth && <li className="nav__item">
                <Link to="/registration" className="header__nav__link">Registration</Link>
              </li>}
              {!isAuth && <li className="header__nav__item">
                <Link to="/auth" className="header__nav__link">Sign in</Link>
              </li>}

              {isAuth && <li className="header__nav__item" onClick={() => dispatch(logout())}>
                <Link to="/" className="header__nav__link" >Logout</Link>
              </li>}
              {isAuth && <li className="header__nav__item">
                <Link to="/" className="header__nav__link">Username</Link>
                <img src={userIcon} alt="userIcon" />
              </li>}
            </ul>
          </nav>

        </div>
      </header>
    </header>

  );
};
export default Header

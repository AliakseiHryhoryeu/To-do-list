import React, { useState } from 'react'
import classNames from 'classnames';
import './Header.scss';

import mainLogo from '@img/favicon.svg'
import userIcon from '@img/userIcon.png'
import { Fragment } from 'react';
import { Link } from 'react-router-dom'


const Header = ({ }) => {
  const [isActive, setActive] = useState(false)
  const toggleClassActive = () => {
    setActive(!isActive)
    console.log(isActive)
  }
  return (
    <header className="header__margin-bottom">
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
              <li className="header__nav__item">
                <Link to="/" className="header__nav__link">Username</Link>
                <img src={userIcon} alt="userIcon" />
              </li>
              <li className="nav__item">
                <Link to="/registration" className="header__nav__link">Registration</Link>
              </li>
              <li className="header__nav__item">
                <Link to="/authorization" className="header__nav__link">Sign in</Link>
              </li>
            </ul>
          </nav>

        </div>
      </header>
    </header>

  );
};
export default Header
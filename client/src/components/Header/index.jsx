import React, { useState } from 'react'
import classNames from 'classnames';
import './Header.scss';

import mainLogo from '../../assets/img/favicon.svg'
import userIcon from '../../assets/img/userIcon.png'



const Header = ({ }) => {
  const [isActive, setActive] = useState(false)
  const toggleClassActive = () => {
    setActive(!isActive)
    console.log(isActive)
  }
  return (
    <header className="header">
      <div className="header__body">
        <div className={classNames("header__burger", { 'active': isActive })} onClick={toggleClassActive}>
          <span></span>
        </div>
        <a className="header__link">
          <img className="header__mainLogo" src={mainLogo} alt="mainLogo" />
          To do list
        </a>


        <nav className={classNames("header__nav", { 'active': isActive })}>
          <ul className="header__nav__list">
            <li className="header__nav__item">
              <a href="#" className="header__nav__link">Username</a>
              <img src={userIcon} alt="userIcon" />
            </li>
            <li className="nav__item">
              <a href="/reg" className="header__nav__link">Registration</a>
            </li>
            <li className="header__nav__item">
              <a href="/auth" className="header__nav__link">Sign in</a>
            </li>
          </ul>
        </nav>

      </div>
    </header>

  );
};
export default Header

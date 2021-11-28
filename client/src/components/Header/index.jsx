import React from 'react'
import mainLogo from '../../assets/img/favicon.svg'
import userIcon from '../../assets/img/userIcon.png'

const Header = ({ color, onClick, className }) => (

  
  <header className="header">
    <a className="header__links__logo">
      <img src={mainLogo} alt="mainLogo" />To do list
    </a>
    <div className="nav__manu">
      <ul className="header__links">
        <li className="nav__item">
          <a href="/reg" className="nav__link">Registration</a>
        </li>
        <li className="nav__item">
          <a href="/auth" className="nav__link">Sign in</a>
        </li>
        <li className="nav__item">
          <a href="#" className="nav__link">Username</a>
          <img src={userIcon} alt="userIcon" />
        </li>
      </ul>

      <div className="nav__close" id="nav-close">
        <i className="ri-close-line"></i>
      </div>
    </div>
  </header>
);

export default Header

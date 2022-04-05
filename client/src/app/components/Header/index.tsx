import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector, connect } from "react-redux";
import classNames from 'classnames';

import { UserActions } from 'app/actions';

import userIcon from '@img/userIcon_1.png'

import {Settings,Lists} from "app/components";

import mainLogo from '@img/favicon.svg'
import settingsIcon from '@img/settingsIcon.svg'
import exitIcon from '@img/exitIcon.svg'

import './Header.scss';

export const Header = () => {

  const isAuth = useSelector(state => state.user.isAuth)
  const dispatch = useDispatch()
  
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
    <>
      <header className="header__wrapper">
        <header className="header">
          <div className="header__container">
            <div className={classNames("header__burger", { 'header__burger-active': isActiveHeaderBurger })} onClick={toggleClassActiveHeaderBurger}>
              <span></span>
            </div>
            <Link to="/main" className="header__link">
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

                  <div className="header__nav__username__container" onClick={()=>toggleClassActiveUsername()}>
                    <div className="header__nav__link-white">{props.username}</div>
                    <img className="header__nav__link-usericon" src={userIcon} alt="userIcon" />
                  </div>

                  <div className={classNames("header__nav__username__content", { 'header__nav__username__content-active': isActiveUsername })}>
                    <div className="header__nav__username__item">
                      <img src={settingsIcon} alt="settingsIcon" />
                      <button className="header__nav__link-white" onClick={() => dispatch(UserActions.showSettings())} >Settings</button>
                    </div>
                    <div className="header__nav__username__item" onClick={() => dispatch(UserActions.logout())}>
                      <img src={exitIcon} alt="exitIcon" />
                      <Link to="/" className="header__nav__link-white" >Logout</Link>
                    </div>
                  </div>
                </li>

              </ul>
              <ul className="header__nav__list header__nav__list-tasks">
                <Lists />
              </ul>
            </nav>}
          </div>
        </header>
      </header>
      {isAuth && props.settings && <Settings />}

    </>

  )
}

// const mapStateToProps = state => ({
//   username: state.user.currentUser.username,
//   settings: state.user.settingsVisible,
//   // alert: state.user.alert,

// })

// const mapDispatchToProps = { showSettings, hideSettings }

// export default connect(mapStateToProps, mapDispatchToProps)(Header)


//       {props.alert && <Alert text={props.alert} />}

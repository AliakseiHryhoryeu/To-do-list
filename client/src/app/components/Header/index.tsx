import React, { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'

import { Settings, Lists } from 'app/components'
// import { UserActions } from 'app/state/actions'
import { RootState } from 'app/store'

import userIcon from 'assets/img/userIcon_1.png'
import mainLogo from 'assets/img/favicon.svg'
import settingsIcon from 'assets/img/settingsIcon.svg'
import exitIcon from 'assets/img/exitIcon.svg'
import themeIcon from 'assets/img/Theme-icon.svg'

import './Header.scss'

export const Header: FC = () => {
	const dispatch = useDispatch()
	const { isAuth, username, userEmail, settingsVisible } = useSelector(
		(state: RootState) => {
			return {
				userEmail: state.user.activeUser.email,
				username: state.user.activeUser.username,
				isAuth: !state.user.trialMode,
				settingsVisible: state.user.settingsVisible,
			}
		}
	)
	// const [isAuth, setIsAuth] = useState(true)
	// const [settingsVisible, setSettingsVisible] = useState(false)

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
			<header className='header__wrapper'>
				<header className='header'>
					<div className='header__container'>
						<div
							className={classNames('header__burger', {
								'header__burger-active': isActiveHeaderBurger,
							})}
							onClick={toggleClassActiveHeaderBurger}
						>
							<span></span>
						</div>
						<Link to='/' className='header__link'>
							<img className='header__mainLogo' src={mainLogo} alt='mainLogo' />
							To do list
						</Link>

						{!isAuth && (
							<nav
								className={classNames('header__nav', {
									'header__nav-active': isActiveHeaderBurger,
								})}
							>
								<ul className='header__nav__list'>
									<li
										className='header__nav__item header__login'
										// onClick={() => setIsAuth(true)}
									>
										<Link to='/login' className='header__nav__link '>
											Log in
										</Link>
									</li>
									<li className='header__nav__item header__signup'>
										<Link to='/signup' className='header__nav__link '>
											Sign Up
										</Link>
									</li>
								</ul>
							</nav>
						)}

						{isAuth && (
							<nav
								className={classNames('header__nav', {
									'header__nav-active': isActiveHeaderBurger,
								})}
							>
								<ul className='header__nav__list-isAuth'>
									<li className='header__nav__item header__nav__username'>
										<div
											className='header__nav__username__container'
											onClick={() => toggleClassActiveUsername()}
										>
											<div className='header__nav__link-white'>{username}</div>
											<img
												className='header__nav__link-usericon'
												src={userIcon}
												alt='userIcon'
											/>
										</div>

										<div
											className={classNames('header__nav__username__content', {
												'header__nav__username__content-active':
													isActiveUsername,
											})}
										>
											<div className='header__nav__username__item'>
												<div className='header__nav__settings-container-userdata'>
													<div className='header__nav__settings-row2'>
														<img
															className='header__nav__settings-usericon'
															src={userIcon}
															alt='userIcon'
														/>
														<div className='header__nav__settings-userdata'>
															<div className='header__nav__settings-userdata-username'>
																{username}
															</div>
															<div className='header__nav__settings-userdata-email'>
																{userEmail}
															</div>
														</div>
													</div>

													<div className='header__nav__settings-row'>
														<img src={settingsIcon} alt='settingsIcon' />
														<div className='header__nav__settings-text'>
															Settings
														</div>
													</div>
												</div>
												<div className='header__nav__settings-sep'></div>
												<div className='header__nav__settings-container'>
													<div
														className='header__nav__settings-row'
														// onClick={() => dispatch(UserActions.logout())}
													>
														<img src={themeIcon} alt='exitIcon' />
														<Link to='/' className='header__nav__link-white'>
															Theme
														</Link>
													</div>
													<div
														className='header__nav__settings-row'
														// onClick={() => setIsAuth(false)}
														// onClick={() => dispatch(UserActions.logout())}
													>
														<img src={exitIcon} alt='exitIcon' />
														<Link to='/' className='header__nav__link-white'>
															Logout
														</Link>
													</div>
												</div>
											</div>
										</div>
									</li>
								</ul>
								<ul className='header__nav__list header__nav__list-tasks'>
									<Lists />
								</ul>
							</nav>
						)}
					</div>
				</header>
			</header>
			{isAuth && settingsVisible && <Settings />}
		</>
	)
}

import React, { FC } from 'react'

import { MainSettings } from './MainSettings'

import accountIcon from 'assets/img/Account-icon.svg'
import ThemeIcon from 'assets/img/Theme-icon.svg'

import './Settings.scss'

export const Settings: FC = props => {
	return (
		<div className='settings'>
			<div className='settings__main'>
				<div className='settings__left'>
					<div className='settings__title'>Settings</div>
					<div className='settings__category'>
						<div className='settings__category-item settings__category-active'>
							<img src={accountIcon} alt='Account-icon' />
							Account
						</div>
						<div className='settings__category-item'>
							<img src={ThemeIcon} alt='Theme-icon' />
							Theme
						</div>
					</div>
				</div>
				<div className='settings__right'>
					<div className='settings__title'>Account</div>
					<MainSettings />
				</div>
			</div>
			<div className='settings__bg'></div>
		</div>
	)
}

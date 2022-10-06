import React, { FC } from 'react'
import { useDispatch } from 'react-redux'

// import { UserActions } from 'app/state/actions'

import closebtn from 'assets/img/remove.svg'
import img1 from 'assets/img/userIcon_1.png'
import img2 from 'assets/img/userIcon_2.png'
import img3 from 'assets/img/userIcon_3.png'
import img4 from 'assets/img/userIcon_4.png'
import img5 from 'assets/img/userIcon_5.png'

import './Settings.scss'

const allUserIcons = [img1, img2, img3, img4, img5]

export const Settings: FC = () => {
	const dispatch = useDispatch()

	return (
		<div className='settings'>
			<div className='settings__wrapper'>
				{/* <img
					src={closebtn}
					alt='Remove icon'
					className='settings__close'
					onClick={() => {
						dispatch(UserActions.hideSettings())
					}}
				/> */}

				<div className='settings__block settings__password'>
					<h3 className='settings__title'>Change password</h3>
					<input
						className='settings__input settings__password'
						placeholder='Curent password...'
						name='password'
						type='password'
					/>
					<input
						className='settings__input settings__password'
						placeholder='New password...'
						name='password'
						type='password'
					/>
					<input
						className='settings__input settings__password'
						placeholder='Repeat new password...'
						name='password'
						type='password'
					/>
					<button
						type='submit'
						className='settings__button btn-settings__password submit'
					>
						Change password
					</button>
				</div>
				<div className='settings__block settings__email'>
					<h3 className='settings__title'>Change email</h3>
					<input
						className='settings__input settings__email'
						placeholder='Curent password...'
						name='password'
						type='password'
					/>
					<input
						className='settings__input settings__email'
						placeholder='New email...'
						name='password'
						type='text'
					/>
					<input
						className='settings__input settings__email'
						placeholder='Repeat new email...'
						name='password'
						type='text'
					/>
					<button
						type='submit'
						className='settings__button btn-settings__password submit'
					>
						Change email
					</button>
				</div>
				<div className='settings__block settings__username'>
					<h3 className='settings__title'>Change username</h3>
					<input
						className='settings__input settings__username'
						placeholder='Curent password...'
						name='password'
						type='password'
					/>
					<input
						className='settings__input settings__username'
						placeholder='New username...'
						name='password'
						type='text'
					/>
					<input
						className='settings__input settings__username'
						placeholder='Repeat new username...'
						name='password'
						type='text'
					/>
					<button
						type='submit'
						className='settings__button btn-settings__username submit'
					>
						Change username
					</button>
				</div>
				<div className='settings__block settings__usericon'>
					<h3 className='settings__title'>Change icon</h3>
					<div className='settings__usericon__wrapper'>
						<div className='settings__usericon__wrapper-imageContainer'>
							{allUserIcons.map((image, index) => (
								<img
									className={'settings__usericon-img'}
									key={index}
									src={image}
									alt='image'
								/>
							))}
						</div>
					</div>
					<button
						type='submit'
						className='settings__button btn-settings__username submit'
					>
						Change icon
					</button>
				</div>
			</div>
		</div>
	)
}

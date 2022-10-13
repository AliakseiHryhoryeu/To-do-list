import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Header } from 'app/components'
// import { RootState } from 'app/state/reducers'

import './PasswordReset.scss'

export const PasswordReset: FC = () => {
	const navigate = useNavigate()
	// const { isAuth } = useSelector((state: RootState) => {
	// 	return {
	// 		isAuth: state.user.isAuth,
	// 	}
	// })

	// if (isAuth === true) {
	// 	navigate('/main', { replace: true })
	// }

	return (
		<div className='passwordreset'>
			<Header />
			<div className='passwordreset__container'>
				<div className='passwordreset__form'>
					<div className='passwordreset__title'>Restore Password</div>

					<input
						className='passwordreset__input'
						type='text'
						placeholder='Email Adress...'
					/>

					<a href='' className='passwordreset__button-reg'>
						Restore Password
					</a>
					<Link to='/auth' className='passwordreset__button-signIn'>
						Alredy have account? Sign in
					</Link>
				</div>
			</div>
		</div>
	)
}

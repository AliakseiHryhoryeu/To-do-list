import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'

import { UserActions } from 'app/state/actions'
import { Header } from 'app/components'
import { RootState } from 'app/state/reducers'
import { registerSchema } from './validation'

import './Registration.scss'

export const Registration: FC = () => {
	const navigate = useNavigate()
	const { isAuth } = useSelector((state: RootState) => {
		return {
			isAuth: state.user.isAuth,
		}
	})

	if (isAuth === true) {
		navigate('/main', { replace: true })
	}

	const formik = useFormik({
		initialValues: {
			username: '',
			email: '',
			password: '',
			repeatPassword: '',
		},
		validationSchema: registerSchema,
		onSubmit: values => {
			UserActions.registration(values.username, values.email, values.password)
		},
	})
	return (
		<div className='registration'>
			<Header />
			<div className='registration__container'>
				<form
					className='registration__form'
					onSubmit={formik.handleSubmit}
					noValidate
				>
					<div className='registration__title'>Registration</div>

					<input
						className='registration__input'
						placeholder='User name...'
						name='username'
						type='text'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.username}
					/>
					<input
						className='registration__input'
						placeholder='Email Adress...'
						name='email'
						type='text'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.email}
					/>
					<input
						className='registration__input'
						placeholder='Password...'
						name='password'
						type='password'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.password}
					/>
					<input
						className='registration__input'
						placeholder='Repeat your password...'
						name='repeatPassword'
						type='password'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.repeatPassword}
					/>

					<button type='submit' className='registration__button-reg'>
						Register
					</button>
					<Link to='/auth' className='registration__button-signIn'>
						Alredy have account? Sign in
					</Link>
				</form>
			</div>
		</div>
	)
}

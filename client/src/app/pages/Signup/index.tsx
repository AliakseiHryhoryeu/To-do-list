import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'

// import { UserActions } from 'app/state/actions'
import { Header } from 'app/components'
// import { RootState } from 'app/state/reducers'
import { signupSchema } from './validation'

import './Signup.scss'

export const Signup: FC = () => {
	const navigate = useNavigate()
	// const { isAuth } = useSelector((state: RootState) => {
	// 	return {
	// 		isAuth: state.user.isAuth,
	// 	}
	// })

	// if (isAuth === true) {
	// 	navigate('/main', { replace: true })
	// }

	// const formik = useFormik({
	// 	initialValues: {
	// 		username: '',
	// 		email: '',
	// 		password: '',
	// 		repeatPassword: '',
	// 	},
	// 	validationSchema: registerSchema,
	// 	onSubmit: values => {
	// 		UserActions.registration(values.username, values.email, values.password)
	// 	},
	// })
	return (
		<div className='Signup'>
			<Header />
			<div className='Signup__container'>
				{/* <form
					className='Signup__form'
					onSubmit={formik.handleSubmit}
					noValidate
				>
					<div className='Signup__title'>Signup</div>

					<input
						className='Signup__input'
						placeholder='User name...'
						name='username'
						type='text'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.username}
					/>
					<input
						className='Signup__input'
						placeholder='Email Adress...'
						name='email'
						type='text'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.email}
					/>
					<input
						className='Signup__input'
						placeholder='Password...'
						name='password'
						type='password'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.password}
					/>
					<input
						className='Signup__input'
						placeholder='Repeat your password...'
						name='repeatPassword'
						type='password'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.repeatPassword}
					/>

					<button type='submit' className='Signup__button-reg'>
						Register
					</button>
					<Link to='/auth' className='Signup__button-signIn'>
						Alredy have account? Sign in
					</Link>
				</form> */}
			</div>
		</div>
	)
}

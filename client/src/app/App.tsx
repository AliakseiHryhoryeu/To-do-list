import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useActions } from './hooks/useActions'
import { useAuth } from './hooks/useAuth'
// import { UserActions } from 'app/state/actions'
import {
	Landing,
	Page404,
	Signup,
	Login,
	RestorePassword,
	Main,
} from 'app/pages'
import { useLoginQuery } from './store/user/user.api'
import { useSignUpQuery } from './store/user/user.api'

function App() {
	const dispatch = useDispatch()
	const { data, error, isLoading } = useLoginQuery({
		email: 'test123@gmail.com',
		password: 'test123',
	})
	// const { data, error, isLoading } = useSignUpQuery({
	// 	email: 'test1234@gmail.com',
	// 	username: 'test1234',
	// 	password: 'test1234',
	// })
	useEffect(() => {
		console.log(data)
		console.log(error)
		console.log(isLoading)
	}, [])
	// useEffect(() => {
	// 	dispatch(UserActions.auth())
	// }, [])
	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<Main />} />

				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<Signup />} />
				<Route path='/restorepass' element={<RestorePassword />} />

				<Route path='/landing' element={<Landing />} />

				<Route path='*' element={<Page404 />} />
			</Routes>
		</div>
	)
}

export default App

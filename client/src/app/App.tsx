import React, { useEffect, useLayoutEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'app/store'

import { useActions } from './hooks/useActions'
import { useAuth } from './hooks/useAuth'
import { useGetData } from './hooks/useGetData'
// import { UserActions } from 'app/state/actions'
import { Landing, Page404, Signup, Login, PasswordReset, Main } from 'app/pages'
import {
	useSignUpQuery,
	useLoginQuery,
	useAuthQuery,
} from './store/user/user.api'
import { userActions } from './store/user/user.slice'
import { listActions } from './store/list/list.slice'
import { useTypedSelector } from './hooks/useAppSelector'

function App() {
	useAuth()
	useGetData()

	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<Main />} />
				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<Signup />} />
				<Route path='/password-reset' element={<PasswordReset />} />
				<Route path='/landing' element={<Landing />} />
				<Route path='*' element={<Page404 />} />
			</Routes>
		</div>
	)
}

export default App

// const {} = useLoginQuery({
// 	email: 'test123@gmail.com',
// 	password: 'test123',
// })
// const token = localStorage.getItem('token')

// useAuthQuery({
// 	token: token,
// })
// const {} = useReadListsByUserIdQuery({
// 	userId: '620926a63d305426d0569798',
// })

// const token = localStorage.getItem('token')
// const {} = useAuthQuery({
// 	token: token,
// })

// const test = listActions.addList({
// 	title: 'test-list',
// 	color: 'blue',
// 	userId: '620926a63d305426d0569798',
// })
// const { auth } = userActions
// useLayoutEffect(() => {
// 	dispatch(auth())
// })

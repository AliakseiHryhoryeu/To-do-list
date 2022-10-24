import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useActions } from './hooks/useActions'
import { useAuth } from './hooks/useAuth'
// import { UserActions } from 'app/state/actions'
import { Landing, Page404, Signup, Login, PasswordReset, Main } from 'app/pages'
import { useLoginQuery, useAuthQuery } from './store/user/user.api'
import { useSignUpQuery } from './store/user/user.api'
import { useReadListsByUserIdQuery } from './store/list/list.api'
import { listActions } from './store/list/list.slice'
import { useTypedSelector } from './hooks/useAppSelector'

function App() {
	const dispatch = useDispatch()
	const {} = useLoginQuery({
		email: 'test123@gmail.com',
		password: 'test123',
	})

	const {} = useReadListsByUserIdQuery({
		userId: '620926a63d305426d0569798',
	})

	const token = localStorage.getItem('token')
	const {} = useAuthQuery({
		token: token,
	})

	const allActions = useActions()

	const test = listActions.addList({
		title: 'test-list',
		color: 'blue',
		userId: '620926a63d305426d0569798',
	})

	console.log(test, 'test')
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

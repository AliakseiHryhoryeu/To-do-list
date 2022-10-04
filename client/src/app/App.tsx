import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { UserActions } from 'app/state/actions'
import {
	Landing,
	Page404,
	Registration,
	SignIn,
	RestorePassword,
	Main,
} from 'app/pages'

function App() {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(UserActions.auth())
	}, [])

	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<Main />} />

				<Route path='/auth' element={<SignIn />} />
				<Route path='/registration' element={<Registration />} />
				<Route path='/restorepass' element={<RestorePassword />} />

				<Route path='/landing' element={<Landing />} />

				<Route path='*' element={<Page404 />} />
			</Routes>
		</div>
	)
}

export default App

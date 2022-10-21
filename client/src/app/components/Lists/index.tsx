import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import { List, AddList } from 'app/components'
// import { RootState } from 'app/state/reducers'
import { useLoginQuery, useAuthQuery } from 'app/store/user/user.api'

import { AllListsBtn } from './AllListsBtn'

import './Lists.scss'

export const Lists: FC = () => {
	// 	const { showAllLists, allLists, activeList } = useSelector(
	// 		(state: RootState) => {
	// 			return {
	// 				showAllLists: state.lists.showAllLists,
	// 				allLists: state.lists.allLists,
	// 				activeList: state.lists.activeList,
	// 			}
	// 		}
	// 	)
	// 	let lists = showAllLists ? allLists : activeList

	const { data, error, isLoading } = useLoginQuery({
		email: 'test123@gmail.com',
		password: 'test123',
	})

	return (
		<>
			<AllListsBtn />
			{/* <List lists={allLists} /> */}

			<AddList />
		</>
	)
}

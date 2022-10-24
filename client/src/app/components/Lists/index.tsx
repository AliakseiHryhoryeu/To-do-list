import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import { List, AddList } from 'app/components'
import { RootState } from 'app/store/'
import { useLoginQuery, useAuthQuery } from 'app/store/user/user.api'

import { AllListsBtn } from './AllListsBtn'

import './Lists.scss'

export const Lists: FC = () => {
	const { showAllLists, allLists, activeList } = useSelector(
		(state: RootState) => {
			return {
				showAllLists: state.list.showAllLists,
				allLists: state.list.allLists,
				activeList: state.list.activeList,
			}
		}
	)
	let lists = showAllLists ? allLists : activeList

	return (
		<>
			<AllListsBtn />
			<List lists={allLists} />

			<AddList />
		</>
	)
}

import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import { List, AddList } from 'app/components'
import { RootState } from 'app/store/'

import { HeaderList } from './HeaderList/'

import './Lists.scss'

export const Lists: FC = () => {
	const { allLists } = useSelector((state: RootState) => {
		return {
			allLists: state.list.allLists,
		}
	})

	return (
		<>
			<HeaderList />
			<List lists={allLists} />
			<AddList />
		</>
	)
}

import React, { FC } from 'react'

import { List, AddList } from 'app/components'

import { HeaderList } from './HeaderList/'

import './Lists.scss'

export const Lists: FC = () => {
	return (
		<>
			<HeaderList />
			<List />
			<AddList />
		</>
	)
}

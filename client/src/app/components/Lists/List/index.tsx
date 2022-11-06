import React, { FC, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'

import { Badge } from 'app/components'
import { useActions } from 'app/hooks/useActions'

import { RootState } from 'app/store'
import {
	listApi,
	useDeleteListMutation,
	useReadListMutation,
} from 'app/store/list/list.api'
import { IList } from 'app/store/list/list.types'

import removeSvg from 'assets/img/remove.svg'

import './List.scss'

type ListProps = {
	lists: IList[]
}

export const List: FC<ListProps> = ({ lists }) => {
	const dispatch = useDispatch()
	const allActions = useActions()
	const [deletePost, { isLoading: isDeleting }] = useDeleteListMutation()

	const { activeList, showAllLists } = useSelector((state: RootState) => {
		return {
			activeList: state.list.activeList,
			showAllLists: state.list.showAllLists,
		}
	})
	const [readList, { isLoading: isLoading }] = useReadListMutation()

	const setActiveList = ({ listId }) => {
		readList({ listId: listId })
		// dispatch(allActions.setList(listId))
	}

	const findActiveList = listId => {
		if (showAllLists) {
			return false
		}
		if (listId !== activeList[0]._id) {
			return false
		}
		return true
	}

	const removeList = (listId: string) => {
		if (window.confirm('Are you sure you want to delete the list?')) {
			dispatch(allActions.settingsHide())
			deletePost({ listId })
		}
	}

	if (lists.length <= 0) {
		return <i></i>
	}

	return (
		<ul className='main__list'>
			{lists.map(list => {
				return (
					<li
						onClick={() => setActiveList({ listId: list._id })}
						key={list._id}
						className={classNames(findActiveList(list._id) ? 'active' : '')}
					>
						<i>{<Badge color={list.color} />}</i>
						<span>{list.title}</span>
						<img
							onClick={() => removeList(list._id)}
							className='main__list__remove-icon'
							src={removeSvg}
							alt='Remove icon'
						/>
					</li>
				)
			})}
		</ul>
	)
}

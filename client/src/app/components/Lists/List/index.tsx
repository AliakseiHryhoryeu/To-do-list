import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'

import { Badge } from 'app/components'
import { useActions } from 'app/hooks/useActions'
import { useTypedSelector } from 'app/hooks/useAppSelector'

import { RootState } from 'app/store'
import {
	useDeleteListMutation,
	useReadListMutation,
} from 'app/store/list/list.api'
import { useReadTasksByTokenMutation } from 'app/store/task/task.api'

import removeSvg from 'assets/img/remove.svg'

import './List.scss'

export const List: FC = () => {
	const dispatch = useDispatch()
	const allActions = useActions()

	const [deletePost, { isLoading: isDeleting }] = useDeleteListMutation()
	const [readList, { isLoading: isLoadingReadList }] = useReadListMutation()
	const [readTasksMutation, { isLoading: isLoadingReadTasks }] =
		useReadTasksByTokenMutation()

	const { lists, activeListId, showAllLists } = useTypedSelector(
		(state: RootState) => {
			return {
				lists: state.list.allLists,
				activeListId: state.list.activeListId,
				showAllLists: state.list.showAllLists,
			}
		}
	)

	const setActiveList = ({ listId }) => {
		readList({ listId: listId })
		readTasksMutation({})
		dispatch(allActions.setList({ listId: listId }))
	}

	const findActiveList = listId => {
		if (showAllLists) {
			return false
		}
		if (listId !== activeListId) {
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
		return <></>
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

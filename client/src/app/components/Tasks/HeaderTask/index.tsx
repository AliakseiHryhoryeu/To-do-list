import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from 'app/hooks/useAppSelector'
import { RootState } from 'app/store'
import editListSvg from 'assets/img/editList.svg'
import { useUpdateListMutation } from 'app/store/list/list.api'
type TaskHeaderProps = {
	listId: string
}

export const HeaderTask: FC<TaskHeaderProps> = ({ listId }) => {
	const [updateListRequest, { isLoading: isLoadingUpdate }] =
		useUpdateListMutation()

	const { list } = useTypedSelector((state: RootState) => {
		return {
			list: state.list.allLists.filter(item => item._id === listId)[0],
		}
	})
	if (!list) {
		return <></>
	}

	const editTitle = () => {
		const newTitle = window.prompt(`New list title`, list.title)
		if (newTitle) {
			updateListRequest({ listId: listId, title: newTitle })
		}
	}
	return (
		<div>
			<h2 className={`tasks__title title--${list.color}`}>
				{list.title}
				<img src={editListSvg} alt='Edit icon' onClick={() => editTitle()} />
			</h2>
		</div>
	)
}

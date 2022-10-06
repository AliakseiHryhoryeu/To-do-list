import React, { FC } from 'react'
import { useSelector } from 'react-redux'

// import { RootState } from 'app/state/reducers'
import { AddTask, Task } from 'app/components'
import { TaskHeader } from './TaskHeader'

import './Tasks.scss'

export const Tasks: FC = () => {
	// const { lists, user, allTasks } = useSelector((state: RootState) => {
	// 	return {
	// 		user: state.user.activeUser,
	// 		lists: state.lists.allLists,
	// 		allTasks: state.tasks.allTasks,
	// 	}
	// })
	// function getTasks(allTasksId: string[]) {
	// 	const response = []
	// 	allTasksId.map(taskId => {
	// 		for (let i = 0; i < allTasks.length; i++) {
	// 			if (allTasks[i]._id == taskId) {
	// 				response.push(allTasks[i])
	// 				break
	// 			}
	// 		}
	// 	})
	// 	return response
	// }
	// if (!lists) {
	// 	return <div className='tasks__item'>Lists not found</div>
	// }
	return (
		<div className='tasks'>
			{/* {lists.map(list => {
				return (
					<div className='tasks__item' key={list._id}>
						<TaskHeader
							listId={list._id}
							title={list.title}
							color={list.color}
						/>
						<Task tasks={getTasks(list.tasksId)} />
						<AddTask userId={user.userId} listId={list._id} />
					</div>
				)
			})} */}
		</div>
	)
}

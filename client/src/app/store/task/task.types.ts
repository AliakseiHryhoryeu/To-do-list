export interface ITask {
	_id: string
	text: string
	completed: boolean
	listId: string
	userId: string
}

export interface ITaskState {
	allTasks: ITask[]
	allTasksTrial: ITask[]
}

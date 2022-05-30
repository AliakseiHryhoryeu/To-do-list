export interface ListModel {
	_id: string
	title: string
	description: string
	color: string
	userId: string
	tasksId: string[]
	date: Date
}

export interface TaskModel {
	_id: string
	text: string
	completed: boolean
	listId: string
	userId: string
}

export interface UserModel {
	userId: string
	username: string
	userIcon: File
}

export enum UserActionsTypes {
	SET_USER = 'USER/SET_USER',
	LOGOUT = 'USER/LOGOUT',
	SETTINGS_SHOW = 'USER/SETTINGS_SHOW',
	SETTINGS_HIDE = 'USER/SETTINGS_HIDE',
	SET_ACTIVE_USERICON = 'USER/SET_ACTIVE_USERICON',
	ALERT_SHOW = 'USER/ALERT_SHOW',
	ALERT_HIDE = 'USER/ALERT_HIDE',
}

export enum ListsActionsTypes {
	GET_LISTS = 'LISTS/GET_LISTS',
	GET_LIST = 'LISTS/GET_LIST',
	SET_LIST = 'LISTS/SET_LIST',
	SHOW_ALL_LISTS = 'LISTS/SHOW_ALL_LISTS',
	ADD_LIST = 'LISTS/ADD_LIST',
	EDIT_LIST = 'LISTS/EDIT_LIST',
	DELETE_LIST = 'LISTS/DELETE_LIST',
}

export enum TasksActionsTypes {
	GET_TASKS = 'TASKS/GET_TASKS',
	SET_TASKS = 'TASKS/SET_TASKS',
	ADD_TASK = 'TASKS/ADD_TASK',
	EDIT_TASK = 'TASKS/EDIT_TASK',
	DELETE_TASK = 'TASKS/DELETE_TASK',
}

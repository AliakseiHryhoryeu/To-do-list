export interface IList {
	_id: string
	title: string
	color: string
	userId: string
	tasksId: string[]
}
export interface IListState {
	allLists: IList[] | undefined
	activeListId: string
	showAllLists: boolean
	colors: string[]
}

export const ColorsList = [
	'grey',
	'lime',
	'purple',
	'black',
	'red',
	'green',
	'blue',
	'pink',
]

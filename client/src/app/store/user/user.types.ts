export interface IUser {
	id: string
	username: string
}

export type IUserState = {
	activeUser: IUser
	token: string
	settingsVisible: boolean
	alert: null | string
}

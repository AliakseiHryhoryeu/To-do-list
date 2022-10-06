export interface IUser {
	userId: string
	username: string
}

export type IUserState = {
	activeUser: IUser
	token: string
	settingsVisible: boolean
	alert: null | string
}

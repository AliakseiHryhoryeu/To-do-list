export interface IUser {
	userId: string
	username: string
	feedbacksId: string[]
	faqId: string[]
}
export interface IUserState {
	activeUser: IUser
	isAuth: boolean
}

export enum AuthStateEnum {
	LoggedWithInfo,
	LoggedWithoutInfo,
	LoggedAndLoadingInfo,
	Unlogged,
}

export interface ILoggedWithInfo {
	state: AuthStateEnum.LoggedWithInfo
	name: string
	email: string
	isAdmin: boolean
}

export interface ILoggedWithoutInfo {
	state: AuthStateEnum.LoggedWithoutInfo
}

export interface ILoggedAndLoadingInfo {
	state: AuthStateEnum.LoggedAndLoadingInfo
}

export interface IUnlogged {
	state: AuthStateEnum.Unlogged
}

export type AuthState =
	| ILoggedWithInfo
	| ILoggedWithoutInfo
	| ILoggedAndLoadingInfo
	| IUnlogged

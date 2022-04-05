import { UserModel, ListModel, TaskModel } from 'app/models';

export namespace RootState {
  export type UserState = {
    activeUser: UserModel,
    isAuth: boolean,
    settingsVisible: boolean,
    alert: null | string,
    allUserIcons: string[]
  }
  export type ListsState = {
    allLists: ListModel[],
    activeList: ListModel[],
    showAll: boolean,
    colors: string[],
  }
  export type TasksState = {
    allTasks: TaskModel[]
  }
}

export interface RootState {
  user: RootState.UserState
  lists: RootState.ListsState
  tasks: RootState.TasksState
  router?: any
}

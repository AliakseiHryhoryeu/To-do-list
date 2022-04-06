import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import uuid from "uuid";

import { TaskHeader } from './TaskHeader'
import { RootState } from 'app/reducers';
import { AddTask, Task } from 'app/components';

import './Tasks.scss';


export const Tasks: FC = () => {
    const { lists, user, allTasks } = useSelector((state: RootState) => {
        return {
            user: state.user.activeUser,
            lists: state.lists.allLists,
            allTasks: state.tasks.allTasks
        }
    })
    function getTasks(allTasksId: string[]) {
        const response = []
        allTasksId.map(taskId => {
            for (let i = 0; i < allTasks.length; i++) {
                if (allTasks[i]._id == taskId) {
                    response.push(allTasks[i])
                    break
                }
            }

        })
        return response
    }
    if (!lists) {
        return (
            <div className='tasks__item'>
                Lists not found
            </div>
        )
    }
    return (
        <div className="tasks">
            {lists.map(list => {
                <div className='tasks__item'>
                    <TaskHeader
                        key={uuid.v4()}
                        listId={list._id}
                        title={list.title}
                        color={list.color}
                    />
                    <Task
                        key={uuid.v4()}
                        tasks={getTasks(list.tasksId)}
                    />
                    <AddTask
                        key={uuid.v4()}
                        userId={user.userId}
                        listId={list._id}
                    />

                </div>
            })}

        </div>
    )

}
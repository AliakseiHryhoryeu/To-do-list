import React from 'react';
import {  connect } from 'react-redux';
import uuid from "uuid";

import TaskHeader from './TaskHeader';
import Task from '../Task';


import './Tasks.scss';
import AddTask from '../AddTask';


const Tasks = (props) => {
    const activeList = props.activeList
    const userId = props.userId
    const allTasks = props.allTasks

    const renderTasks = () => {
        try {
            let response = []

            if (activeList.length) {
                for (let i = 0; i < activeList.length; i++) {
                    const temp = (
                        <div className='tasks__item'>
                            <TaskHeader
                                key={uuid.v4()}
                                listId={activeList[i]._id}
                                title={activeList[i].title}
                                color={activeList[i].color}
                            />
                            <Task
                                key={uuid.v4()}
                                tasksId={activeList[i].tasksId}
                                allTasks={allTasks}
                            />
                            <AddTask
                                key={uuid.v4()}
                                userId={userId}
                                listId={activeList[i]._id}
                            />

                        </div>
                    )
                    response.push(temp)
                }
            } else {
                const temp = (
                    <div className='tasks__item'>
                        <TaskHeader
                            key={uuid.v4()}
                            listId={activeList._id}
                            title={activeList.title}
                            color={activeList.color}
                        />
                        <Task
                            key={uuid.v4()}
                            tasksId={activeList.tasksId}
                            allTasks={allTasks}
                        />
                        <AddTask
                            key={uuid.v4()}
                            userId={userId}
                            listId={activeList._id}
                        />

                    </div>
                )
                response.push(temp)
            }
            return response

        } catch {
            return (
                <div className='tasks__item'>
                    Lists not found
                </div>
            )
        }
    }

    return (
        <div className="tasks">
            {renderTasks()}
        </div>
    )
}


const mapStateToProps = state => ({
    activeList: state.lists.activeList,
    userId: state.user.currentUser.userId,
    allTasks: state.tasks.allTasks


})


export default connect(mapStateToProps, null)(Tasks)
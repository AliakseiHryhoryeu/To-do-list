import React from 'react';
import { useDispatch, connect } from 'react-redux';

import TaskHeader from './TaskHeader';
import Task from '../Task';


import './Tasks.scss';
import AddTask from '../AddTask';

const Tasks = (props) => {
    const dispatch = useDispatch()

    const allLists = props.allLists
    const activeList = props.activeList
    const allTasks = props.allTasks
    const userId = props.userId


    const renderTasks = () => {
        let response = []

        for (let i = 0; i < allLists.length; i++) {
            const temp = (
                <div className='tasks__item'>
                    <TaskHeader
                        key={allLists[i].listId}
                        listId={allLists[i].listId}
                        title={allLists[i].title}
                        color={allLists[i].color}
                    />
                    {renderTask(allLists[i].tasksId) }
                    <AddTask
                        key={allLists[i].listId}
                        userId={userId}
                        listId={allLists[i].listId}
                    />

                </div>
            )
            response.push(temp)
        }
        return response
    }

    const renderTask = (tasks)=>{
        let response = []
        // taskId, text, completed

        for (let j = 0; j < tasks.length; j++) {

            const temp = (
                <Task key={Math.random(0,1000)}
                taskId={tasks[j]}
                
                 
                />
            )
            response.push(temp)
        }
        return response

    }


    return (
        <div className="tasks">
            {renderTasks()}
        </div>
    )
}

const mapStateToProps = state => ({
    allLists: state.lists.allLists,
    activeList: state.lists.activeList,
    allTasks: state.tasks.allTasks,
    userId:state.user.currentUser.userId


})


export default connect(mapStateToProps, null)(Tasks)
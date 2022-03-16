import React from 'react';
import { useDispatch, connect } from 'react-redux';

import TaskHeader from './TaskHeader';
import Task from '../Task';


import './Tasks.scss';

const Tasks = (props) => {
    const dispatch = useDispatch()

    return (
        <div className="tasks">
            <TaskHeader />
            <Task />

        </div>
    )
}

const mapStateToProps = state => ({
    currentList: state.lists.currentList,

})


export default connect(mapStateToProps, null)(Tasks)
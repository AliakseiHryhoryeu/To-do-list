import React from 'react';
import { useDispatch,connect } from 'react-redux';

import editListSvg from '@img/editList.svg';
import editTaskSvg from '@img/editTask.svg';
import deleteTaskSvg from '@img/deleteTask.svg';

import './Tasks.scss';

const Tasks=(props)=> {
const dispatch = useDispatch()
    
    return ( 
        <div className="tasks">
            <h2 className="tasks__title">
                Фронтенд
                <img src={editListSvg} alt="Edit icon" />
            </h2>

            <div className="tasks__items-row">
                <div className="checkbox">
                    <input />
                    <label >
                        <svg
                            width="11"
                            height="8"
                            viewBox="0 0 11 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
                                stroke="#000"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </label>
                </div>
                <p>task 1</p>
                <div className="tasks__items-row-actions">
                    <div >
                        <img src={editTaskSvg} alt="Edit icon" />
                    </div>
                    <div>
                        <img src={deleteTaskSvg} alt="Delete icon" />
                    </div>
                </div>
            </div>

        </div>
    )
}

const mapStateToProps = state => ({
    currentList: state.lists.currentList,
  
  })
  

export default connect(mapStateToProps, null)(Tasks)
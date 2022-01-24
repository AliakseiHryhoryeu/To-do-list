import React from 'react'

import { useDispatch } from "react-redux";
import { connect } from 'react-redux';

import { hideAlert } from '@actions/userActions'

import './Alert.scss'

import closebtn from '@img/remove.svg'


function Alert({ text }) {

    const dispatch = useDispatch();

    return (
        <div className="alert">
            <div className="alert__wrapper" onClick={() => { dispatch(hideAlert()) }}>
                <div className="alert__message">
                    {text}
                </div>
                <img src={closebtn}
                    alt="Remove icon"
                    className="alert__close"
                    onClick={() => { dispatch(hideAlert()) }}
                />

            </div>
        </div>
    )
}


const mapStateToProps = state => ({
    user: state.user.alertVisible
})

const mapDispatchToProps = { hideAlert }

export default connect(mapStateToProps, mapDispatchToProps)(Alert)


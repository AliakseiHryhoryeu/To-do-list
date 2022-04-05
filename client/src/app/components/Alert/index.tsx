import React from 'react'

import { useDispatch } from "react-redux";
import { connect } from 'react-redux';

import { UserActions } from 'app/actions'

import './Alert.scss'

import closebtn from '@img/remove.svg'


export const Alert = ({ text }) => {

    const dispatch = useDispatch();

    return (
        <div className="alert">
            <div className="alert__wrapper" onClick={() => { dispatch(UserActions.hideAlert()) }}>
                <div className="alert__message">
                    {text}
                </div>
                <img src={closebtn}
                    alt="Remove icon"
                    className="alert__close"
                    onClick={() => { dispatch(UserActions.hideAlert()) }}
                />

            </div>
        </div>
    )
}


// const mapStateToProps = state => ({
//     user: state.user.alertVisible
// })

// const mapDispatchToProps = { hideAlert }

// export default connect(mapStateToProps, mapDispatchToProps)(Alert)


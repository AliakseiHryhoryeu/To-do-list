import React, { FC } from 'react'
import { useDispatch } from "react-redux";

import { UserActions } from 'app/actions'

import closebtn from 'assets/img/remove.svg'

import './Alert.scss'

type AlertProps = {
    text:string
}

export const Alert:FC<AlertProps> = ({ text }) => {

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

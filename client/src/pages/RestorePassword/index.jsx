import React, {useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

import { auth } from "@actions/userActions";

import Header from '@components/Header'

import './RestorePassword.scss'

export default function RestorePassword() {

    const isAuth = useSelector(state => state.user.isAuth)
    const navigate = useNavigate()

    if (isAuth === true) {
        navigate('/main', { replace: true })
    }

    return (
        <div className="restorepass" >
            <Header />
            <div className="restorepass__container">
                <div className="restorepass__form">
                    <div className="restorepass__title">Restore Password</div>

                    <input className="restorepass__input" type="text" placeholder='Email Adress...' />

                    <a href="" className="restorepass__button-reg">Restore Password</a>
                    <Link to="/auth" className="restorepass__button-signIn">Alredy have account? Sign in</Link>
                </div>
            </div>
        </div>
    )
}

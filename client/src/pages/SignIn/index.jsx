import React from 'react'
import { Link } from 'react-router-dom'

import Header from '@components/Header'

import './SignIn.scss'

export default function SignIn() {
    return (
        <div className='signIn'>
            <Header />
            <div className="signIn__container">
                <div className="signIn__form">
                    <div className="signIn__title">Sign In</div>

                    <input className="signIn__input" type="text" placeholder='User name...' />
                    <input className="signIn__input" type="text" placeholder='Password...' />

                    <Link to="/auth" className="signIn__button btn-signIn">Sign In</Link>
                    <Link to="/registration" className="signIn__button btn-reg">Dont have account? Register</Link>
                    <Link to="/restorepass" className="signIn__button btn-restorepass">Forgot your password?</Link>
                </div>
            </div>
        </div>
    )
}

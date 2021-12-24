import React from 'react'

import Header from '@components/Header'

import './Registration.scss'

export default function Registration() {
    return (
        <div className='registration'>
            <Header />
            <div className="registration__container">
                <div className="registration__form">
                    <div className="registration__title">Registration</div>

                    <input type="text" placeholder='Email Adress...' />
                    <input type="text" placeholder='User name...' />
                    <input type="text" placeholder='Password...' />
                    <input type="text" placeholder='Repeat your password...' />

                    <a href="" className="registration__button">Register</a>
                    <a href="" className="registration__signIn">Alredy have account? Sign in</a>
                </div>
            </div>
        </div>
    )
}

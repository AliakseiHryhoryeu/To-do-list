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

                    <input className="registration__input" type="text" placeholder='User name...' />
                    <input className="registration__input" type="text" placeholder='Email Adress...' />
                    <input className="registration__input" type="text" placeholder='Password...' />
                    <input className="registration__input" type="text" placeholder='Repeat your password...' />
                    
                    <a href="" className="registration__button-reg">Register</a>
                    <a href="" className="registration__button-signIn">Alredy have account? Sign in</a>
                </div>
            </div>
        </div>
    )
}

import React from 'react'

import Header from '@components/Header'

import './RestorePassword.scss'

export default function RestorePassword() {
    return (
        <div className="restorepass" >
            <Header />
            <div className="restorepass__container">
                <div className="restorepass__form">
                    <div className="restorepass__title">Restore Password</div>

                    <input className="restorepass__input" type="text" placeholder='Email Adress...' />

                    <a href="" className="restorepass__button-reg">Restore Password</a>
                    <a href="" className="restorepass__button-signIn">Alredy have account? Sign in</a>
                </div>
            </div>
        </div>
    )
}

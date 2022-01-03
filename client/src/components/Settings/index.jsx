import React from 'react'

import './Settings.scss'

import img1 from '@img/userIcon_1.png'
import img2 from '@img/userIcon_2.png'
import img3 from '@img/userIcon_3.png'
import img4 from '@img/userIcon_4.png'
import img5 from '@img/userIcon_5.png'

import closebtn from '@img/remove.svg'

export default function Settings() {


    return (
        //need use redux for change visibly settings
        <div className="settings" >
            <div className="settings__wrapper">
                <img src={closebtn}
                    alt="Remove icon"
                    className="settings__close"
                    onClick={(e) => { e.target.style.display = 'none' }}
                />

                <div className="settings__block settings__password">
                    <h3 className="settings__title">Change password</h3>
                    <input className="settings__input settings__password"
                        placeholder='Curent password...'
                        name="password"
                        type="password"
                    />
                    <input className="settings__input settings__password"
                        placeholder='New password...'
                        name="password"
                        type="password"
                    />
                    <input className="settings__input settings__password"
                        placeholder='Repeat new password...'
                        name="password"
                        type="password"
                    />
                    <button type="submit" className="settings__button btn-settings__password submit" >Change password</button>

                </div>
                <div className="settings__block settings__email">
                    <h3 className="settings__title">Change email</h3>
                    <input className="settings__input settings__email"
                        placeholder='Curent password...'
                        name="password"
                        type="password"
                    />
                    <input className="settings__input settings__email"
                        placeholder='New email...'
                        name="password"
                        type="password"
                    />
                    <input className="settings__input settings__email"
                        placeholder='Repeat new email...'
                        name="password"
                        type="password"
                    />
                    <button type="submit" className="settings__button btn-settings__password submit" >Change email</button>

                </div>
                <div className="settings__block settings__username">
                    <h3 className="settings__title">Change username</h3>
                    <input className="settings__input settings__username"
                        placeholder='Curent password...'
                        name="password"
                        type="password"
                    />
                    <input className="settings__input settings__username"
                        placeholder='New username...'
                        name="password"
                        type="password"
                    />
                    <input className="settings__input settings__username"
                        placeholder='Repeat new username...'
                        name="password"
                        type="password"
                    />
                    <button type="submit" className="settings__button btn-settings__username submit" >Change username</button>

                </div>
                <div className="settings__block settings__usericon">
                    <h3 className="settings__title">Change icon</h3>
                    <div className="settings__usericon__wrapper">
                        <div className="settings__usericon__wrapper-text">
                            <button type="button" className="settings__subbutton" >Point your icon</button>
                            <h3 className="settings__subtitle">Or select image:</h3>
                        </div>
                        <div className="settings__usericon__wrapper-imageContainer">
                            <img className="settings__usericon-img settings__usericon-active" src={img1} alt="img1" />
                            <img className="settings__usericon-img" src={img2} alt="img2" />
                            <img className="settings__usericon-img" src={img3} alt="img3" />
                            <img className="settings__usericon-img" src={img4} alt="img4" />
                            <img className="settings__usericon-img" src={img5} alt="img5" />

                        </div>
                    </div>

                    <button type="submit" className="settings__button btn-settings__username submit" >Change icon</button>

                </div>

            </div>
        </div>
    )
}

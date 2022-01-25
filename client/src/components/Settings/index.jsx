import React, { useEffect } from 'react'

import { useDispatch } from "react-redux";
import { connect } from 'react-redux';

import { hideSettings } from '@actions/userActions'

import './Settings.scss'

import img1 from '@img/userIcon_1.png'
import img2 from '@img/userIcon_2.png'
import img3 from '@img/userIcon_3.png'
import img4 from '@img/userIcon_4.png'
import img5 from '@img/userIcon_5.png'

import closebtn from '@img/remove.svg'


function Settings() {

    const dispatch = useDispatch();

    return (
        <div className="settings" >
            <div className="settings__wrapper">
                <img src={closebtn}
                    alt="Remove icon"
                    className="settings__close"
                    onClick={() => { dispatch(hideSettings()) }}
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



const mapDispatchToProps = { hideSettings }

export default connect(null, mapDispatchToProps)(Settings)


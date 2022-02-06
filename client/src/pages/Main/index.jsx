import React from 'react'

import Header from '@components/Header'
import Lists from '@components/Lists';
import Tasks from "@components/Tasks";

import './Main.scss'

export default function Main() {

    return (
        <div className='main'>
            <Header />
            <div className="main__wrapper">
                <div className="main__menu">
                    <div className="main__menu__wrapper">
                        <Lists />
                    </div>
                </div>
                <div className="main__tasks">
                    <div className="main__tasks__wrapper">
                        <Tasks />
                    </div>
                </div>
            </div>
        </div>
    )
}

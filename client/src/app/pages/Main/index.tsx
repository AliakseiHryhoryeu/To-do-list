import React, { FC } from 'react'

import { Header, Lists, Tasks } from 'app/components'

import './Main.scss'

export const Main: FC = () => {

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

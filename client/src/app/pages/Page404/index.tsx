import React from 'react'

import {Header} from 'app/components'

import './Page404.scss'

export const Page404 = () =>{
    return (
        <div className="page404">
            <Header />
            <div className="page404__main">
                <div className="page404__text">
                    <span>404</span>
                    page not found
                </div>
            </div>
        </div>
    )
}

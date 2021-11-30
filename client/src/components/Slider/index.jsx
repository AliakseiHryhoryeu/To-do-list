import React from 'react'

import './Slider.scss'

export default function Slider() {
    return (
        <div className="slider">
            <div className="slider__buttons">
                <button className="slider__buttons-prev">Prev</button>
            </div>
            <div className="slider__container">
                <div className="slider__track">
                    <div className="slider__item"></div>
                    <div className="slider__item"></div>
                    <div className="slider__item"></div>
                    <div className="slider__item"></div>
                </div>
            </div>
            <div className="slider__buttons">
                <button className="slider__buttons-prev">Next</button>
            </div>
        </div>
    )
}

import React from 'react'

import './Slider.scss'


export default function Slider() {

    let position = 0
    const slidesToShow = 1
    const sliderToScroll = 1
    const container = document.querySelector('.slider__container')
    const track = document.querySelector('.slider__track')
    const btnPrev = document.querySelector('.slider__buttons-prev')
    const btnNext = document.querySelector('.slider__buttons-next')
    const items = document.querySelector('.slider__item')
    const itemsCount = items.lenght
    const itemWidth = container.clientWidth() / slidesToShow
    const movePosition = sliderToScroll*itemWidth

    items.forEach((item) => {
        item.style.minWidth = `${itemWidth}px`
    })

    btnNext.addEventListener('click',()=>{
        const itemsLeft = Math.abs(position)/itemWidth
        position+=itemsLeft>=sliderToScroll?movePosition:itemsLeft*itemWidth

        setPosition();
        checkBtns();
    })

    const setPosition=()=>{
        track.style.transform = `translateX(${position}px)`
    }
    const checkBtns = ()=>{
        btnPrev.disabled = position === 0
        btnNext.disabled = position <= -(itemsCount - slidesToShow)*itemWidth
    }

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

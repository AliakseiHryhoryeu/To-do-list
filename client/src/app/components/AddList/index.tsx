import React, { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Badge } from 'app/components'
import { ListsActions } from 'app/state/actions'
import { RootState } from 'app/state/reducers'

import closeSvg from 'assets/img/close.svg'
import './AddList.scss'

export const AddList: FC = () => {
	const [visiblePopup, setVisiblePopup] = useState(false)
	const [selectedColor, setSelectedColor] = useState('green')
	const [inputValue, setInputValue] = useState('')

	const dispatch = useDispatch()
	const { user, colors } = useSelector((state: RootState) => {
		return {
			user: state.user.activeUser,
			colors: state.lists.colors,
		}
	})

	return (
		<div className='add-list'>
			<ul
				onClick={() => {
					setVisiblePopup(!visiblePopup)
				}}
				className='main__list'
			>
				<li>
					<i>
						<svg
							width='16'
							height='12'
							viewBox='0 0 12 16'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
							className='listIconPlus'
						>
							<path
								d='M8 1V15'
								stroke='black'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M1 8H15'
								stroke='black'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</i>
					<span>Add List</span>
				</li>
			</ul>

			{visiblePopup && (
				<div className='add-list__popup'>
					<img
						onClick={() => setVisiblePopup(false)}
						src={closeSvg}
						alt='Close button'
						className='add-list__popup-close-btn'
					/>
					<input
						onChange={e => setInputValue(e.target.value)}
						value={inputValue}
						className='field'
						type='text'
						placeholder='Folder Name'
					/>
					<div className='add-list__popup-colors'>
						{colors.map((color, index) => (
							<Badge
								onClick={() => setSelectedColor(color)}
								key={index}
								color={color}
								className={selectedColor === color && 'active'}
							/>
						))}
					</div>
					<button
						className='button'
						onClick={() =>
							dispatch(
								ListsActions.addList(user.userId, inputValue, selectedColor)
							)
						}
					>
						Add New List
					</button>
				</div>
			)}
		</div>
	)
}

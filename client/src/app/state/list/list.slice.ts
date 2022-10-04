import { IFeedback, IFeedbackState } from './list.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: IFeedbackState = {
	feedbackPosts: [
		{
			_id: '',
			title: '',
			text: '',
			username: '',
			date: '',
			userId: '',
		},
	],
}

export const listSlice = createSlice({
	name: 'list',
	initialState,
	reducers: {
		getFeedback: (state, action: PayloadAction<IFeedback>) => {
			state.feedbackPosts.push(action.payload)
		},
		addFeedback: (state, action: PayloadAction<IFeedback>) => {
			state.feedbackPosts.push(action.payload)
		},
		editFeedback: (state, action: PayloadAction<IFeedback>) => {
			state.feedbackPosts.push(action.payload)
		},
		deleteFeedback: (state, action: PayloadAction<IFeedback>) => {
			state.feedbackPosts.push(action.payload)
		},
	},
})

export default listSlice.reducer

export const listReducer = listSlice.reducer
export const listActions = listSlice.actions

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import { IFaqState, IFAQ } from './task.types'

const initialState: IFaqState = {
	faqPosts: [
		{
			_id: '',
			title: '',
			text: '',
			userId: '',
		},
	],
}

export const getFaq = createAsyncThunk('Faq/get', async () => {
	// const res = await TutorialDataService.create({ title, description })
	const res = {
		data: '',
	}
	return res.data
})

export const taskSlice = createSlice({
	name: 'task',
	initialState,
	reducers: {
		addFaq: (state, action: PayloadAction<IFAQ>) => {
			state.faqPosts.push(action.payload)
		},
		editFaq: (state, action: PayloadAction<IFAQ>) => {
			state.faqPosts.push(action.payload)
		},
		deleteFaq: (state, action: PayloadAction<IFAQ>) => {
			state.faqPosts.push(action.payload)
		},
	},
	extraReducers: builder => {
		// getFaq: (state, action: PayloadAction<IFAQ>) => {
		// 	state.faqPosts.push(action.payload)
		// },
		builder.addCase(getFaq.pending, (state, action: PayloadAction<IFAQ>) => {
			console.log(action.payload)
			state.faqPosts.push(action.payload)
		})
	},
})

export const taskReducer = taskSlice.reducer
export const taskActions = taskSlice.actions

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import TutorialDataService from '../services/tutorial.service'

// const initialState = []

// export const createTutorial = createAsyncThunk(
// 	'tutorials/create',
// 	async ({ title, description }) => {
// 		const res = await TutorialDataService.create({ title, description })
// 		return res.data
// 	}
// )

// export const retrieveTutorials = createAsyncThunk(
// 	'tutorials/retrieve',
// 	async () => {
// 		const res = await TutorialDataService.getAll()
// 		return res.data
// 	}
// )

// export const updateTutorial = createAsyncThunk(
// 	'tutorials/update',
// 	async ({ id, data }) => {
// 		const res = await TutorialDataService.update(id, data)
// 		return res.data
// 	}
// )

// export const deleteTutorial = createAsyncThunk(
// 	'tutorials/delete',
// 	async ({ id }) => {
// 		await TutorialDataService.delete(id)
// 		return { id }
// 	}
// )

// export const deleteAllTutorials = createAsyncThunk(
// 	'tutorials/deleteAll',
// 	async () => {
// 		const res = await TutorialDataService.deleteAll()
// 		return res.data
// 	}
// )

// export const findTutorialsByTitle = createAsyncThunk(
// 	'tutorials/findByTitle',
// 	async ({ title }) => {
// 		const res = await TutorialDataService.findByTitle(title)
// 		return res.data
// 	}
// )

// const tutorialSlice = createSlice({
// 	name: 'tutorial',
// 	initialState,
// 	extraReducers: {
// 		[createTutorial.fulfilled]: (state, action) => {
// 			state.push(action.payload)
// 		},
// 		[retrieveTutorials.fulfilled]: (state, action) => {
// 			return [...action.payload]
// 		},
// 		[updateTutorial.fulfilled]: (state, action) => {
// 			const index = state.findIndex(
// 				tutorial => tutorial.id === action.payload.id
// 			)
// 			state[index] = {
// 				...state[index],
// 				...action.payload,
// 			}
// 		},
// 		[deleteTutorial.fulfilled]: (state, action) => {
// 			let index = state.findIndex(({ id }) => id === action.payload.id)
// 			state.splice(index, 1)
// 		},
// 		[deleteAllTutorials.fulfilled]: (state, action) => {
// 			return []
// 		},
// 		[findTutorialsByTitle.fulfilled]: (state, action) => {
// 			return [...action.payload]
// 		},
// 	},
// })

// const { reducer } = tutorialSlice
// export default reducer

// export const faqReducer = (state = initialState, action) => {
// 	let index
// 	let newArray

// 	switch (action.type) {
// 		case FaqActionsTypes.GET_FAQ:
// 			return {
// 				...state,
// 				faqPosts: action.payload,
// 			}

// 		case FaqActionsTypes.ADD_FAQ:
// 			return {
// 				...state,
// 				faqPosts: [...state.faqPosts, { ...action.payload }],
// 			}
// 		case FaqActionsTypes.EDIT_FAQ:
// 			index = state.faqPosts.findIndex(faq => faq._id === action.payload._id)
// 			newArray = [...state.faqPosts]
// 			newArray[index] = action.payload
// 			return {
// 				...state,
// 				faqPosts: newArray,
// 			}

// 		case FaqActionsTypes.DELETE_FAQ:
// 			return {
// 				...state,
// 				faqPosts: action.payload,
// 			}
// 		default:
// 			return state
// 	}
// }

import * as actionTypes from './actionTypes'

export function taskreducer(state, action) {
	switch (action.type) {
		case actionTypes.taskUpdated: {
			const newArray = [...state]
			const elementIndex = newArray.findIndex((el) => el.id === action.payload.id)
			newArray[elementIndex] = { ...newArray[elementIndex], ...action.payload }
			return newArray
		}
		case actionTypes.taskDeleted: {
			const newArray = [...state]
			return newArray.filter((el) => el.id !== action.payload.id)
		}
		default:
			return state
	}
}

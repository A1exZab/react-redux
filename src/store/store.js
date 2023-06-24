import { legacy_createStore as createStore } from 'redux'
import { taskreducer } from './taskReducer'

const initialState = [
	{ id: 1, title: 'task-1', completed: false },
	{ id: 2, title: 'task-2', completed: false },
	{ id: 3, title: 'task-3', completed: false }
]

export function initiateStore() {
	return createStore(taskreducer, initialState)
}

import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import configureStore from './store/store'
import {
	titleChanged,
	taskRemoved,
	completeTask,
	loadTasks,
	getTasks,
	getTasksLoadingStatus,
	createTask
} from './store/task'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { getError } from './store/errors'

const store = configureStore()

const App = () => {
	const state = useSelector(getTasks())
	const isLoading = useSelector(getTasksLoadingStatus())
	const error = useSelector(getError())
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(loadTasks())
	}, [])

	const addTask = () => {
		dispatch(createTask({ userId: 1, title: 'New task', completed: false }))
	}

	const changeTitle = (taskId) => {
		dispatch(titleChanged(taskId))
	}

	const removeTask = (taskId) => {
		dispatch(taskRemoved(taskId))
	}

	if (isLoading) {
		return <h1>Loading...</h1>
	}

	if (error) {
		return <p>{error}</p>
	}

	return (
		<>
			<h1>App</h1>
			<button onClick={addTask}>Add task</button>
			<ul>
				{state.map((el) => (
					<li key={el.id}>
						<p>{el.title}</p>
						<p>{`Completed: ${el.completed}`}</p>
						<button onClick={() => dispatch(completeTask(el.id))}>Complete</button>
						<button onClick={() => changeTitle(el.id)}>Change title</button>
						<button onClick={() => removeTask(el.id)}>Delete</button>
						<hr />
					</li>
				))}
			</ul>
		</>
	)
}

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
)

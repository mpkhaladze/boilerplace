import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './stateOfArt'
import '../style.css'


const App = () => (
	<Provider store={store}>
		<div className='hello'>something</div>
	</Provider>
)

ReactDOM.render(
	<App />,
	document.body.appendChild(document.createElement('main'))
)

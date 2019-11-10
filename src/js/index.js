import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './routes'
import { Provider } from 'react-redux'
import { store } from './stateOfArt'
import 'bootstrap/dist/css/bootstrap.css';
import '../style.css'


const App = () => (
	<Provider store={store}>
		<React.Fragment>
			<Routes />
		</React.Fragment>
	</Provider>
)

ReactDOM.render(
	<App />,
	document.body.appendChild(document.createElement('main'))
)

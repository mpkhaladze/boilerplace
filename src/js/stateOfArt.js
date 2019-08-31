import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import browserHistory from './helpers/browserHistory'
import { routerMiddleware } from 'connected-react-router'
import reducers from './reducers'

export const store = createStore(reducers, composeWithDevTools(
	applyMiddleware(
		thunk,
		routerMiddleware(browserHistory)
	)
))

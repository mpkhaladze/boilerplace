import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import browserHistory from './helpers/browserHistory'
import { routerMiddleware } from 'connected-react-router'
// import postMessageMiddleware from 'helpers/postMessageMiddleware'
import reducers from './reducers'

export const store = createStore(reducers, composeWithDevTools(
	applyMiddleware(
		// postMessageMiddleware,
		thunk,
		routerMiddleware(browserHistory)
	)
	// persistState([
	// 	'auth.isAuthenticated',
	// 	'auth.isTokenExpired',
	// 	'auth.token',
	// 	'auth.refreshToken',
	// 	'auth.user',
	// 	'menu.collapsed'
	// ])
))

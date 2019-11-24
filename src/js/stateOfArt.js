import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { routerMiddleware } from 'connected-react-router'
import browserHistory from 'helpers/browserHistory'
import persistState from 'helpers/persistState'
import postMessageMiddleware from 'helpers/postMessageMiddleware'
import reducers from 'reducers'
import thunk from 'redux-thunk'

export const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(
    postMessageMiddleware,
    thunk,
    routerMiddleware(browserHistory)
  ),
  persistState([
    'auth.isAuthenticated',
    'auth.isTokenExpired',
    'auth.token',
    'auth.refreshToken',
    'auth.user',
    'menu.collapsed'
  ])
))

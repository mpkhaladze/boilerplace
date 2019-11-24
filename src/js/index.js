import 'helpers/facebook'
import { Provider } from 'react-redux'
import { store } from 'stateOfArt'
import React from 'react'
import ReactDOM from 'react-dom'
import application from 'modules/application'
import browserHistory from 'helpers/browserHistory'

const App = () => (
  <Provider store={store}>
    <application.Application browserHistory={browserHistory} />
  </Provider>
)

ReactDOM.render(
  <App />,
  document.body.appendChild(document.createElement('main'))
)

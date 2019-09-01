import { ConnectedRouter } from 'connected-react-router'
import browserHistory from '../helpers/browserHistory'
import React from 'react'
import { Route, Switch } from 'react-router'


export default () =>
	<ConnectedRouter history={browserHistory}>
				<Switch>
					<Route render={() => (<div>Hi There</div>)} />
					<Route render={() => (<div>Page not Found</div>)} />
				</Switch>
	</ConnectedRouter>

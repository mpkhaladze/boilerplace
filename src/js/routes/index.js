import { ConnectedRouter } from 'connected-react-router'
import browserHistory from '../helpers/browserHistory'
import { Authentic } from '../components'
import { routes } from '../modules'
import React from 'react'
import { Route, Switch } from 'react-router'


export default () =>
	<ConnectedRouter history={browserHistory}>
				<Switch>
					{ console.log(routes) }
					<Route render={() => (<div>Page not Found</div>)} />
				</Switch>
	</ConnectedRouter>

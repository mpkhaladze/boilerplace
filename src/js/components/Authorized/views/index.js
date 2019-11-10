import React  from 'react'
import { Redirect } from 'react-router-dom'

export default class Authorized extends React.Component {
	render () {
		const { isAuthorized, children } = this.props

		if (isAuthorized) {
			return (
				<div> something
					{ children }
				</div>
			)
		}

		return (
			<Redirect to='/login' />
		)

	}
}

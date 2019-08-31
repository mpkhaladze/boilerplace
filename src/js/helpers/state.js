import { handleActions as reduxActionsHandleActions } from 'redux-actions'
import PropTypes from 'prop-types'
import R from 'ramda'
import _ from 'lodash'

export async function when (fn) {
	const { store } = require('../stateOfArt')

	const state = store.getState()

	if (fn(state)) {
		return state
	} else {
		return new Promise((resolve, reject) => {
			const unsubscribe = store.subscribe(() => {
				const state = store.getState()

				if (fn(state)) {
					unsubscribe()
					resolve(state)
				}
			})
		})
	}
}

export const handleActions = (reducers, defaultState, types = null, moduleName = '[reducer]') => {
	const actionHandler = reduxActionsHandleActions(reducers, defaultState)

	return (state, action) => {
		const newState = actionHandler(_.defaultsDeep(state, defaultState), action)

		PropTypes.checkPropTypes(types, newState, 'prop', moduleName)

		return newState
	}
}

export const stateLastReducer = R.curry((fn, state, { payload }) => fn(payload)(state))

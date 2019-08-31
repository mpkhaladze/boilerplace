import { LOCATION_CHANGE } from 'connected-react-router'
import { handleActions } from '../helpers/state'
import _ from 'lodash'
import qs from 'qs'

const initialState = {
	query: {}
}

export default handleActions({
	[LOCATION_CHANGE]: (state, { payload }) => {
		const query = qs.parse(payload.location.search.substring(1))

		return _.defaults({ query }, state)
	}
}, initialState)

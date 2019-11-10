import { LOCATION_CHANGE } from 'connected-react-router'
import { handleActions } from '../helpers/state'
import { defaults } from 'lodash'
import { parse } from 'qs'

const initialState = {
	query: {}
}

export default handleActions({
	[LOCATION_CHANGE]: (state, { payload }) => {
		const query = parse(payload.location.search.substring(1))
		return defaults({ query }, state)
	}
}, initialState)

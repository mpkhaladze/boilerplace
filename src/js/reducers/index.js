import { basename } from 'path'
import { combineReducers } from 'redux'
import { reducers as moduleReducers } from '../modules'
import {pipe, map as rMap, fromPairs, mergeAll} from 'ramda'


const context = require.context('./', true, /^((?!index).)*\.js$/)
const reducers = pipe(
	rMap(path => [basename(path, '.js'), context(path).default]),
	fromPairs
)(context.keys())
export default combineReducers(mergeAll([reducers, moduleReducers]))

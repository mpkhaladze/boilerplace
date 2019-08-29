import { basename, dirname } from 'path'
import R from 'ramda'

const routesFromContext = context => R.chain(
	R.pipe(context, R.prop('default')),
	context.keys()
)

const reducersFromContext = context => R.reduce(
	(obj, path) => R.assoc(
		basename(dirname(dirname(path))),
		R.prop('default', context(path)),
		obj
	),
	{},
	context.keys()
)

export const routes = routesFromContext(require.context('./', true, /\.\/\w+\/routes\/index\.js$/))
export const reducers = reducersFromContext(require.context('./', true, /\.\/\w+\/reducers\/index\.js$/))
console.log(reducers)

export default {
	routes,
	reducers
}

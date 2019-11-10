import { connect } from 'react-redux'
import View from '../views'

const mapStateToProps = state => {
	console.log(state)
	return {
		isAuthorized: state.isAuthorized
	}
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(View)

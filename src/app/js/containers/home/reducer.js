const reducer = function(state=[], action) {
	switch (action.type) {
		case '@@home/ROUTE_UPDATE':
			return action.payload
		case '@@ROUTE_INSERT':
			return state.concat([action.payload])
		default:
			return state
	}
}

export default reducer

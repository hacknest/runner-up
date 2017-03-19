export const initialState = [{id:123, name:'ABBY GRIND', difficulty:5, time:'12h30m15s',distance:10, elevation:500},
                {id:456,name:'BRIDAL VEIL FALLS', difficulty:5, time:'2h30m15s',distance:10, elevation:500},
                {id:789,name:'BRUNSWICK POINT', difficulty:5, time:'2h30m15s',distance:10, elevation:500},
                {id:125,name:'BRUNSWICK POINT', difficulty:5, time:'2h30m15s',distance:10, elevation:500},
                {id:999,name:'BRUNSWICK POINT', difficulty:5, time:'2h30m15s',distance:10, elevation:500}
        ]

const reducer = function(state=initialState, action) {
	switch (action.type) {
		default:
			return state
	}
}

export default reducer

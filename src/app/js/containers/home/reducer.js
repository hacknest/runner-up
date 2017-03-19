export const initialState = [{id:123, name:'ABBY GRIND', difficulty:5, time:'12h30m15s',distance:10, elevation:500, url:'https://www.google.com/maps/embed/v1/directions?key=AIzaSyD0byp-RpRoTfcwzb_PiZB-e5kFuVV-_es&origin=49.2660907,-123.24387&waypoints=49.264535, -123.249488&destination=49.2669168,-123.2582466&avoid=tolls|highways'},
                {id:456,name:'BRIDAL VEIL FALLS', difficulty:5, time:'2h30m15s',distance:10, elevation:500, url:'https://www.google.com/maps/embed/v1/directions?key=AIzaSyD0byp-RpRoTfcwzb_PiZB-e5kFuVV-_es&origin=49.2660907,-123.24387&waypoints=49.264535, -123.249488&destination=49.2669168,-123.2582466&avoid=tolls|highways'},
                {id:789,name:'BRUNSWICK POINT', difficulty:5, time:'2h30m15s',distance:10, elevation:500, url:'https://www.google.com/maps/embed/v1/directions?key=AIzaSyD0byp-RpRoTfcwzb_PiZB-e5kFuVV-_es&origin=49.2660907,-123.24387&waypoints=49.264535, -123.249488&destination=49.2669168,-123.2582466&avoid=tolls|highways'},
                {id:125,name:'BRUNSWICK POINT', difficulty:5, time:'2h30m15s',distance:10, elevation:500, url:'https://www.google.com/maps/embed/v1/directions?key=AIzaSyD0byp-RpRoTfcwzb_PiZB-e5kFuVV-_es&origin=49.2660907,-123.24387&waypoints=49.264535, -123.249488&destination=49.2669168,-123.2582466&avoid=tolls|highways'},
                {id:999,name:'BRUNSWICK POINT', difficulty:5, time:'2h30m15s',distance:10, elevation:500, url:'https://www.google.com/maps/embed/v1/directions?key=AIzaSyD0byp-RpRoTfcwzb_PiZB-e5kFuVV-_es&origin=49.2660907,-123.24387&waypoints=49.264535, -123.249488&destination=49.2669168,-123.2582466&avoid=tolls|highways'}
        ]

const reducer = function(state=initialState, action) {
	switch (action.type) {
		default:
			return state
	}
}

export default reducer

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import { reducer, initialState } from './containers/reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// Create store and allow for redux devtools to hook onto it
export default createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
)

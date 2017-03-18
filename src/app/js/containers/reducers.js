import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import header from './header/reducer'

export const reducer = combineReducers({
    headerTitle: header,
    routing
})

export const initialState = {
}

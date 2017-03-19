import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import header from './header/reducer'
import routes from './home/reducer'

export const reducer = combineReducers({
    headerTitle: header,
    routing,
    routes: routes
})

export const initialState = {
}

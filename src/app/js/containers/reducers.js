import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import header from './header/reducer'
import routes from './home/reducer'
import searchTerm from './search-bar/reducer'

export const reducer = combineReducers({
    headerTitle: header,
    routing,
    routes,
    searchTerm
})

export const initialState = {
}

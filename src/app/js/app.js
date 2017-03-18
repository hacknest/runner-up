import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { Router, Route, IndexRoute, IndexRedirect, hashHistory } from 'react-router'

import Layout from './components/layout'
import { Home } from './containers'
import store from './store'

const history = syncHistoryWithStore(hashHistory, store)

// Render app
ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path='/' component={Layout}>
                <IndexRoute component={Home} />
                {/*<Route path='demo/:demoId(^[0-9]+$)' component={Demo} />*/}
            </Route>
        </Router>
    </Provider>
, document.getElementById('app'))

if (module.hot) {
    module.hot.accept()
}

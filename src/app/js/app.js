import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { Router, Route, IndexRoute, IndexRedirect, hashHistory } from 'react-router'

import Layout from './components/layout'
import { Home, RouteDetailsPage, RouteTracker, MapView } from './containers'
import { updateRoutes } from './containers/home/action'
import store from './store'

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
        var routes = JSON.parse(xhr.responseText)
        store.dispatch(updateRoutes(routes))
    }
}

xhr.open('GET', '/paths', true)
xhr.send(null)

const history = syncHistoryWithStore(hashHistory, store)

// Render app
ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path='/' component={Layout}>
                <IndexRoute component={Home} />
                <Route path='route/:id' component={RouteDetailsPage} />
            </Route>
            <Route path='route/tracker/:id' component={RouteTracker} />
        </Router>
    </Provider>
, document.getElementById('app'))

if (module.hot) {
    module.hot.accept()
}

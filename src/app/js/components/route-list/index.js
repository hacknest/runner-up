import React from 'react'
import RouteListCard from '../route-list-item';

const RouteList = (props) => {
    const routeItems = props.routes.map((route, index) => {
        return (
            <RouteListCard key={index} route={route} />
        )
    })

    return (
        <ul> {routeItems} </ul>
    )
}

export default RouteList
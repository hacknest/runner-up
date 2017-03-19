import React from 'react'
import RouteListCard from '../route-list-item';

const RouteList = (props) => {
    const routeItems = props.routes.map((route, index) => {
        return (
            <RouteListCard key={index} route={route} />
        )
    })

    return (
        <div class='c-card__list'> {routeItems} </div>
    )
}

export default RouteList
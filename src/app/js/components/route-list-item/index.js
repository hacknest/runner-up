import React from 'react'
import { Link } from 'react-router'


const RouteListCard = ({route}) => {
    return (
        <Link to={`route/${route.id}`}>
            <div class='c-card u-shadow u-flex-row'>
                <div class='u-margin-h-small'>
                    <div>
                        <img src='http://placehold.it/90x90'></img>
                    </div>
                </div>
                <div class='u-flex-column u-margin-h-small'>
                    <div>
                        <span class='u-text__weight-heavy'>Name: </span>
                        <span>{route.name}</span>
                    </div>
                    <div>
                        <span class='u-text__weight-heavy'>Difficulty: </span>
                        <span>{route.difficulty}</span>
                    </div>
                    <div>
                        <span class='u-text__weight-heavy'>Time: </span>
                        <span>{route.time}</span>
                    </div>
                    <div>
                        <span class='u-text__weight-heavy'>Distance: </span>
                        <span>{route.distance}</span>
                    </div>
                    <div>
                        <span class='u-text__weight-heavy'>Elevation: </span>
                        <span>{route.elevation}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default RouteListCard
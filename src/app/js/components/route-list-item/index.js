import React from 'react';

const RouteListCard = ({route}) => {
    if(!route) {
        return <div>Loading...</div>;
    }

    return (
        <div className='c-card'>
            <div> {route.name} </div>
            <div> {route.difficutit} </div>
            <div> {route.time} </div>
            <div> {route.distance} </div>
            <div> {route.elevation} </div>
        </div>
    )
}

export default RouteListCard
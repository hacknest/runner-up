import React from 'react'
import { Link } from 'react-router'
import Icon from '../../global/icon'
import Utils from '../../global/utils'

const getImg = function(difficulty) {
    const stars = Utils.starsForDifficulty(difficulty)
    return <div class='c-route__difficulty-stars u-flex-row u--center'>{stars}</div>
}

const RouteListCard = ({route}) => {
    var details = []
    for (var key in route) {
        if (key === 'distance' || key === 'time') {
            var iconName = Utils.iconNameMap[key];
            details.push(
                <div key={key} class='u-flex-row u--space-between u--center-cross u-padding-h-small'>
                    <div class='c-route__detail-row-icon-container'> {Icon.get({iconName, color: 'light'})}</div>
                    <div>{route[key]}</div>
                </div>
            )
        } else if (key === 'name') {
            details.push(
                <div key={key} class='u-flex-row u--center-self u-padding-h-small u-padding-v-small'>
                    <div>{route[key]}</div>
                </div>
            )
        }
    }

    return (
        <Link to={`route/${route.id}`}>
            <div class='c-card u-shadow u-flex-row'>
                <div class='u-margin-h-small'>
                    <div class='c-card__thumbnail-container'>
                        <img class='c-card__thumbnail' src={route.img}></img>
                    </div>
                </div>
                <div class='u-flex-column u-margin-h-small u-full-width'>
                    {details}
                </div>
            </div>
        </Link>
    )
}

export default RouteListCard
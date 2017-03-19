import React from 'react'
import Icon from './icon'

const Utils = {}

Utils.iconNameMap = {
    time: 'timer',
    distance: 'distance',
    elevation: 'elevate'
}

Utils.makeId = function() {
    return (Math.random()+1).toString(36).substring(7)
}

Utils.stringToTitleCase = function(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

Utils.starsForDifficulty = function(difficulty) {
    const maxStars = 5
    const stars = []
    const difficultyNum = eval(difficulty)
    const difficultyInt = Math.floor(difficultyNum);
    const hasFraction = difficultyNum%1 !== 0

    for (var i = 0; i < difficultyInt; i++) {
        stars.push(<div key={i} class='u-margin-small c-icon__container'>{Icon.get({iconName: 'star', color: 'gold'})}</div>)
    }
    if (hasFraction) stars.push(<div key={i} class='c-icon__container'>{Icon.get({iconName: 'halfStar', color: 'gold'})}</div>)
    for (var j = i; j < maxStars; j++) {
        stars.push(<div key={j+1} class='u-margin-small c-icon__container'>{Icon.get({iconName: 'emptyStar', color: 'gold'})}</div>)
    }

    return stars
}

export default Utils

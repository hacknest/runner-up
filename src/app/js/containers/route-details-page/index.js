import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import Icon from '../../global/icon'

import { updateHeaderTitle } from '../header/action'

const RouteDetailRow = (props) => {
    const starsForDifficulty = function(difficulty) {
        const stars = []
        const difficultyNum = eval(difficulty)
        const hasFraction = difficultyNum%1 !== 0

        console.log(hasFraction)
        for (var i = 0; i < difficultyNum - 1; ++i) {
            stars.push(<div key={i}>{Icon.star()}</div>)
        }

        if (hasFraction) stars.push(<div key={i}>{Icon.halfStar()}</div>)
        console.log(stars)
        return stars
    }

    const getImg = function() {
        if (props.name === 'difficulty') {
            const stars = starsForDifficulty(props.value)
            console.log(stars)
            return <div class='c-route__difficulty-stars'>{stars}</div>
        } else {
            return (
                <div class='c-route__detail-row-icon-container u-margin-right-large'>
                    <img class='c-route__detail-row-icon' src={props.iconSrc || "http://placehold.it/50x50"} />
                </div>
            )
        }
    }

    return (
        <div class='u-flex-row u--center-cross u-full-width u-margin-v-medium'>
                {getImg()}
            <div class='c-route__detail-row__details u-flex-row'>
                <p class='c-route__detail-row__details-text'>{props.name}</p>
                <p class='c-route__detail-row__details-text'>{props.value}</p>
            </div>
        </div>
    )
}

class RouteDetailsPage extends React.Component {
    componentWillMount() {
        const title = 'Runner Up'
        this.props.updateHeaderTitle(title)
    }

    render() {
        const defaultRoute = {
            name: 'Tested Route',
            difficulty: '4.5',
            time: '2hrs',
            distance: '2km',
            elevation: '900m',
        }
        const detailRows = Object.keys(defaultRoute).map((key, index) => {
            if (key === 'name' || key === 'difficulty' ) return null;
            return <RouteDetailRow key={index} name={key} value={defaultRoute[key]} iconSrc={null} />
        })

        console.log(detailRows)

        const mapSrc = 'https://www.google.com/maps/embed?pb=!1m24!1m8!1m3!1d20830.990385480516!2d-123.2459363!3d49.2598379!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m3!3m2!1d49.266027199999996!2d-123.24482049999999!4m3!3m2!1d49.266867399999995!2d-123.2403573!4m3!3m2!1d49.263638099999994!2d-123.22404429999999!5e0!3m2!1sen!2sca!4v1489887905647'
        return (
            <div class='t-page u-flex-column u--center-cross'>
                <div class='c-route__detail-map-container'>
                    {/*<img class='u-full-width' src={'http://placehold.it/500x500'} />*/}
                    <iframe class='c-route__detail-map u-shadow' src={mapSrc} />
                </div>

                {/* Details */}
                <div class="c-card u-shadow u-flex-column u--center">
                    <RouteDetailRow name={'difficulty'} value={defaultRoute['difficulty']} />
                </div>

                <div class="c-card u-shadow u-flex-column u--center">
                    {detailRows}
                </div>
                <div>
                    <button class="c-button c--primary u-full-width"> START </button>
                </div>
            </div>
        )
    }
}

RouteDetailsPage.propTypes = {
}

const mapStateToProps = function(state) {
    return {
    }
}

const mapDispatchToProps = function(dispatch) {
    return bindActionCreators({updateHeaderTitle}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteDetailsPage)

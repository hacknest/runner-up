import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import Icon from '../../global/icon'
import Utils from '../../global/utils'


import { updateHeaderTitle } from '../header/action'

const RouteDetailRow = (props) => {
    const starsForDifficulty = function(difficulty) {
        const stars = []
        const difficultyNum = eval(difficulty)
        const difficultyInt = Math.floor(difficultyNum);
        const hasFraction = difficultyNum%1 !== 0

        for (var i = 0; i < difficultyInt; i++) {
            stars.push(<div key={i} class='u-margin-small c-icon__container'>{Icon.get({iconName: 'star', color: 'gold'})}</div>)
        }

        if (hasFraction) stars.push(<div key={i} class='c-icon__container'>{Icon.get({iconName: 'halfStar', color: 'gold'})}</div>)
        return stars
    }

    const getImg = function() {
        const iconNameMap = {
            time: 'timer',
            distance: 'distance',
            elevation: 'elevate'
        }
        const iconName = iconNameMap[props.name]
        if (props.name === 'difficulty') {
            const stars = starsForDifficulty(props.value)
            return <div class='c-route__difficulty-stars u-flex-row u--center'>{stars}</div>
        } else {
            return (
                <div class='c-route__detail-row-icon-container u-margin-right-large'>
                    {Icon.get({iconName, color: 'light'})}
                </div>
            )
        }
    }

    const isDifficultyRow = (props.name === 'difficulty')
    return (
        <div class='c-route__detail-row u-flex-row u--center-cross u-full-width u-margin-v-medium'>

            {isDifficultyRow ? '' : getImg()}
            <div class='c-route__detail-row__details u-flex-row u-full-width u--center-cross'>
                <p class='c-route__detail-row__details-text u-grow u-margin-none'>{Utils.stringToTitleCase(props.name)}</p>
                {isDifficultyRow
                    ? getImg()
                    : <p class='c-route__detail-row__details-text u-text-light'>{props.value}</p>
                }
            </div>
        </div>
    )
}

class RouteDetailsPage extends React.Component {
    componentWillMount() {
        const route = this.getRouteFromState() || {}
        const title = route.name || 'Unkown Route'
        this.props.updateHeaderTitle(title)
    }

    getRouteFromState() {
        const matches = this.props.routes.filter(obj => obj.id == this.props.params.id)
        return matches.length > 0 ? matches[0] : undefined
    }

    render() {
        const defaultRoute = {
            name: 'Tested Route',
            difficulty: '4.5',
            time: '2hrs',
            distance: '2km',
            elevation: '900m',
        }
        const route = this.getRouteFromState() || defaultRoute

        const detailRows = Object.keys(route).map((key, index) => {
            if (key === 'time' || key === 'distance' || key === 'elevation' ) return <RouteDetailRow key={index} name={key} value={route[key]} iconSrc={null} />
            return null
        })

        const mapSrc = 'https://www.google.com/maps/embed?pb=!1m24!1m8!1m3!1d20830.990385480516!2d-123.2459363!3d49.2598379!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m3!3m2!1d49.266027199999996!2d-123.24482049999999!4m3!3m2!1d49.266867399999995!2d-123.2403573!4m3!3m2!1d49.263638099999994!2d-123.22404429999999!5e0!3m2!1sen!2sca!4v1489887905647'
        return (
            <div class='t-page u-flex-column u--center-cross'>
                <div class='c-route__detail-map-container u-margin-v-medium'>
                    <iframe class='c-route__detail-map u-shadow' src={mapSrc} />
                </div>

                <div class="c-card u-shadow u-flex-column u--center">
                    <RouteDetailRow name={'difficulty'} value={route['difficulty']} />
                </div>

                <div class="c-card u-shadow u-flex-column u--center">
                    {detailRows}
                </div>
                <Link class='u-full-width' to={`/route/tracker/${this.props.params.id}`}>
                    <button class="c-button c--primary u-margin-v-large u-full-width"> START </button>
                </Link>
            </div>
        )
    }
}

RouteDetailsPage.propTypes = {
    route: PropTypes.object
}

const mapStateToProps = function(state) {
    return {
        routes: state.routes
    }
}

const mapDispatchToProps = function(dispatch) {
    return bindActionCreators({updateHeaderTitle}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteDetailsPage)

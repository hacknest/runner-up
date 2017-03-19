import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'

import { updateHeaderTitle } from '../header/action'

class RouteDetailsPage extends React.Component {
    componentWillMount() {
        const title = 'Runner Up'
        this.props.updateHeaderTitle(title)
    }

    render() {
        return (
            <div class='t-page u-flex-column u--center-cross'>
                <div>
                    <div> Awesome Route </div>
                    <div> Google map </div>
                </div>
                {/* Details */}
                <div class="c-card u-shadow u-flex-column u--center">
                    <ul>
                        <div>
                            <span> icon </span>
                            <span> Difficulty </span> <span> Intermidiate </span>
                        </div>
                        <div>
                            <span> icon </span>
                            <span> Time </span> <span> 1.5 hours</span>
                        </div>
                        <div>
                            <span> icon </span>
                            <span> Distance </span> <span> 4 kms </span>
                        </div>
                        <div>
                            <span> icon </span>
                            <span> Elevation Gain </span> <span> 330 m </span>
                        </div>
                    </ul>
                </div>

                <div>
                    <button class="c-button c--primary"> START </button>
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

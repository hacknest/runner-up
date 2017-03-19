import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import MapView from '../../components/map-view' 

// import { updateHeaderTitle } from '../header/action'

class RouteTracker extends React.Component {
    componentWillMount() {
        const title = 'Route Tracker'
        // this.props.updateHeaderTitle(title)
    }

    render() {
        this.props.params.id
        var routeURL = undefined
        for (var i = 0; i < this.props.routes.length; i++){
            if (this.props.routes[i].id == this.props.params.id){
                routeURL = this.props.routes[i].url
                console.log("You've found a match: " + this.props.routes[i].id + " " + routeURL)
                break
            }
        }
        return (
            <div id='tracker' class='u-flex-column u--center-cross'>
                <MapView routeURL={routeURL} />
            </div>
        )
    }
}

RouteTracker.propTypes = {
}

const mapStateToProps = function(state) {
    // console.log("HELLO")
    return {
        routes: state.routes
    }
}

// const mapDispatchToProps = function(dispatch) {
//     return bindActionCreators({updateHeaderTitle}, dispatch)
// }

export default connect(mapStateToProps)(RouteTracker)

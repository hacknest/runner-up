import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'

import { updateHeaderTitle } from '../header/action'

import RouteList from '../../components/route-list'

class Home extends React.Component {


    componentWillMount() {
        const title = 'Runner Up'
        this.props.updateHeaderTitle(title)
    }

    render() {
        return (
            <div class='t-page u-flex-column u--center-cross'>
                <RouteList routes={this.props.routes}/>
            </div>
        )
    }
}

Home.propTypes = {
}

const mapStateToProps = function(state) {
    return {
        routes: state.routes
    }
}

const mapDispatchToProps = function(dispatch) {
    return bindActionCreators({updateHeaderTitle}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

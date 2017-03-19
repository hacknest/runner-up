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
        const routes = [{name:'BADEN POWELL LYNN CANYON TO GROUSE', difficulty:5, time:'2h30m15s',distance:10, elevation:500},
                {name:'BRIDAL VEIL FALLS', difficulty:5, time:'2h30m15s',distance:10, elevation:500},
                {name:'BRUNSWICK POINT', difficulty:5, time:'2h30m15s',distance:10, elevation:500}
        ];
        return (
            <div class='t-page u-flex-column u--center-cross'>
                <RouteList routes={routes}/>
            </div>
        )
    }
}

Home.propTypes = {
}

const mapStateToProps = function(state) {
    return {
    }
}

const mapDispatchToProps = function(dispatch) {
    return bindActionCreators({updateHeaderTitle}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'

import { updateHeaderTitle } from '../header/action'

import RouteList from '../../components/route-list'
import SearchBar from '../search-bar/'

class Home extends React.Component {


    componentWillMount() {
        const title = 'Runner Up'
        this.props.updateHeaderTitle(title)
    }

    render() {
        const filteredRoutes = this.props.routes.filter((route) => {
            if (this.props.searchTerm === '') {
                return true
            } else {
                return route.name.toLocaleLowerCase().includes(this.props.searchTerm.toLocaleLowerCase())
            }
        })
        return (
            <div class='t-page u-flex-column u--center-cross'>
                <SearchBar/>
                <Link class='u-full-width' to={`/plan/1`}>
                    <button class="c-button c--primary u-margin-v-large u-full-width"> CREATE </button>
                </Link>
                <RouteList routes={filteredRoutes}/>
            </div>
        )
    }
}

Home.propTypes = {
}

const mapStateToProps = function(state) {
    return {
        routes: state.routes,
        searchTerm: state.searchTerm
    }
}

const mapDispatchToProps = function(dispatch) {
    return bindActionCreators({updateHeaderTitle}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

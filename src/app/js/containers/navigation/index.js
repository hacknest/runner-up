import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux'

import { toggleNavMenu } from './action'

class Navigation extends React.Component {
    componentWillMount() {
    }

    render() {
        const { isOpen, toggleNavMenu } = this.props
        const stateClass = isOpen ? 'c--open' : 'c--closed'

        return (
            <nav class='c-navigation' >
                <button class={`c-navigation__toggle-button ` + stateClass} onClick={() => toggleNavMenu(isOpen)}>
                </button>
                <ul class={`c-navigation__menu ` + (isOpen ? '' : 'u-hidden')}>
                    <li class='c-navigation__menu-item'>Home</li>
                    <li class='c-navigation__menu-item'>Shop</li>
                </ul>
            </nav>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        isOpen: state.navigation.menuOpen
    }
}

const mapDispatchToProps = function(dispatch) {
    return bindActionCreators({toggleNavMenu}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navigation))

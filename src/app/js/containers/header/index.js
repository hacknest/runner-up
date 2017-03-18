import React from 'react'
import { connect } from 'react-redux'

class Header extends React.Component {
    render() {
        return (
            <header class='c-header'>
                <h1 class='c-header__title'>
                    {this.props.title}
                </h1>
            </header>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        title: state.headerTitle
    }
}

export default connect(mapStateToProps)(Header)

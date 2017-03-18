import React from 'react'

import Header from '../../containers/header'
import Footer from '../footer'

class Layout extends React.Component {
    render() {
        return (
            <div>
                <Header />
                {this.props.children}
                <Footer />
            </div>
        )
    }
}

export default Layout

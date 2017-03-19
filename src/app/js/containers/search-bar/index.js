import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { onSearchBarChange } from  './action'
import _ from 'lodash';


class SearchBar extends Component {

    render() {

        // throttling the search every 500 ms
        const searchFn = _.debounce((term) => {this.onInputChange(term)}, 500);

        return (
            <div className='c-search-bar u-shadow'>
                <input
                placeholder='Search A Route'
                onChange={event => searchFn(event.target.value)} />
            </div>
        )
    }

    onInputChange(term) {
        this.props.onSearchBarChange(term)
    }
}

const mapStateToProps = function(state) {
    return {
    }
}

const mapDispatchToProps = function(dispatch) {
    return bindActionCreators({onSearchBarChange}, dispatch)
}

export default connect(null, mapDispatchToProps)(SearchBar)
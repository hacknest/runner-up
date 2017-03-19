import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { insertRoute }  from './action'

class Planner extends Component {

	render() {
		return (
			<div class='t-page'>
            	<button
            		class="c-button c--primary u-margin-v-large u-full-width"
            		onClick={event => this.onSubmit(event.target.value)}
            	> CREATE ROUTE </button>
            </div>
		)
	}

	onSubmit(value) {
		console.log('submiting...', value)

		// var data = new FormData();
		// data.append('name', 'wutman');
		// data.append('difficulty', 5.0);
		// data.append('time', '1hr 5min');
		// data.append('elevation', '5m');

		var data = {
			id: Math.floor(Math.random() * 1000),
			name: 'Newly-inserted',
			distance: '123km',
			difficulty: 0.5,
			time: '10min',
			elevation: '1m',
			url: "https://www.google.com/maps/embed?",
			img: "/assets/default.png"
		}

		var xhttp = new XMLHttpRequest();
		var self = this
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				console.log( this.responseText)

				self.props.insertRoute(data)
			}
		};
		xhttp.open("POST", "/paths", true);
		xhttp.setRequestHeader("Content-type", "application/json");
		xhttp.send(JSON.stringify(data));
	}
}


const mapStateToProps = function(state) {
	return {
		routes: state.routes
	}
}

const mapDispatchToProps = function(dispatch) {
	return bindActionCreators({insertRoute}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Planner)
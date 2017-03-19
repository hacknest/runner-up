/*
 * Base Google Map example
 */
import React, {PropTypes, Component} from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

import GoogleMap from 'google-map-react';
import MyGreatPlace from './my_great_place.js';


class MapView extends Component {



render(){
  console.log("I have received: " + this.props.routeURL)
  var mapSrc = this.props.routeURL
  return(
  // <iframe src="https://www.google.com/maps/embed?pb=!1m24!1m8!1m3!1d20830.990385480516!2d-123.2459363!3d49.2598379!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m3!3m2!1d49.266027199999996!2d-123.24482049999999!4m3!3m2!1d49.266867399999995!2d-123.2403573!4m3!3m2!1d49.263638099999994!2d-123.22404429999999!5e0!3m2!1sen!2sca!4v1489887905647" width="1500" height="1500" frameBorder="0" allowFullScreen></iframe>
  <iframe src={mapSrc} width="1500" height="1500" frameBorder="0" allowFullScreen></iframe>
  // <iframe src="https://www.google.ca/maps/dir/49.2660272,-123.2448205/49.8317382,-122.7303347/@49.5167849,-123.5251849,9z/data=!3m1!4b1" width="1500" height="1500" frameBorder="0" allowFullScreen></iframe>
  
  )}
}


export default MapView
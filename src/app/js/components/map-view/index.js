/*
 * Base Google Map example
 */
import React, {PropTypes, Component} from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

import GoogleMap from 'google-map-react';
import MyGreatPlace from './my_great_place.js';


class MapView extends Component {



render(){
  var mapSrc = this.props.routeURL
  return(
    <iframe class="c-map-view" src={mapSrc} frameBorder="0" allowFullScreen></iframe>
  )}
}


export default MapView
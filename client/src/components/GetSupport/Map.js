// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

// We should probably check prop types
// const propTypes = {
//
// };


const MapComponent = withGoogleMap(props =>
  <GoogleMap
    defaultZoom={16}
    defaultCenter={{ lat: 38.115180, lng: -121.2952122 }}
    defaultOptions={{
      styles: [{"featureType":"all","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"all","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#ffdfc0"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#000000"},{"visibility":"on"}]},{"featureType":"administrative","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"},{"visibility":"on"}]},{"featureType":"administrative.neighborhood","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"visibility":"on"},{"color":"#ffffff"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#fcfcfc"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#0d5d83"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#000000"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#dddddd"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#07638f"},{"gamma":"1"},{"saturation":"71"},{"lightness":"-41"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#f4f4f4"},{"weight":"3"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#20b789"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"road.highway.controlled_access","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"road.highway.controlled_access","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"road.highway.controlled_access","elementType":"labels.text.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"visibility":"off"},{"color":"#07638f"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#20b789"}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#000000"}]},{"featureType":"road.local","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"transit.line","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"visibility":"on"}]}]
    }}
  >
    <Marker
      position={{ lat: 38.115180, lng: -121.2952122 }} />

  </GoogleMap>
);


// Map.propTypes = propTypes;

export default MapComponent;

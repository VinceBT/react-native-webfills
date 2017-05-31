/* eslint-disable no-undef */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Polyline extends Component {

  static propTypes = {
    coordinates: PropTypes.arrayOf(PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    })).isRequired,
    strokeWidth: PropTypes.number,
    strokeColor: PropTypes.string,
    lineCap: PropTypes.string,
    geodesic: PropTypes.bool,
    onPress: PropTypes.func,
    gMap: PropTypes.object,
  };

  static defaultProps = {

  };

  componentDidMount() {
    const { coordinates, strokeWidth, strokeColor, lineCap, geodesic, gMap, onPress } = this.props;
    const formattedCoordinates = coordinates.map(coordinate => ({
      lat: coordinate.latitude,
      lng: coordinate.longitude,
    }));
    this._polyline = new google.maps.Polyline({
      path: formattedCoordinates,
      geodesic,
      strokeColor,
      strokeOpacity: 1.0,
      strokeWeight: strokeWidth,
    });
    this._polyline.setMap(gMap);
    this._polyline.addListener('click', () => {
      if (onPress) onPress();
    });
  }

  componentWillUnmount() {
    this._polyline.setMap(null);
  }

  _polyline = null;

  render() {
    return null;
  }

}

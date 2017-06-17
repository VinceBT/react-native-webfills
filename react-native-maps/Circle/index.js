/* eslint-disable no-undef */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Circle extends Component {

  static propTypes = {
    center: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }).isRequired,
    radius: PropTypes.number,
    strokeWidth: PropTypes.number,
    strokeColor: PropTypes.string,
    fillColor: PropTypes.string,
    onPress: PropTypes.func,
    gMap: PropTypes.object,
  };

  static defaultProps = {};

  componentDidMount() {
    const { center, radius, strokeWidth, strokeColor, fillColor, gMap } = this.props;
    const formattedCoordinates = {
      lat: center.latitude,
      lng: center.longitude,
    };
    this._circle = new google.maps.Circle({
      center: formattedCoordinates,
      radius,
      strokeColor,
      fillColor,
      strokeOpacity: 1.0,
      strokeWeight: strokeWidth,
    });
    this._circle.setMap(gMap);
    this._circle.addListener('click', () => {
      if (this.props.onPress) this.props.onPress();
    });
  }

  componentWillUpdate(nextProps, nextState) {
    const { center, radius, strokeWidth, strokeColor, fillColor } = nextProps;
    const formattedCoordinates = {
      lat: center.latitude,
      lng: center.longitude,
    };
    this._circle.setOptions({
      center: formattedCoordinates,
      radius,
      strokeColor,
      fillColor,
      strokeOpacity: 1.0,
      strokeWeight: strokeWidth,
    });
  }

  componentWillUnmount() {
    this._safeDeleteCircle();
  }

  _circle = null;

  _safeDeleteCircle = () => {
    if (this._circle)
      this._circle.setMap(null);
  };

  render() {
    return null;
  }

}

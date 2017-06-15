/* eslint-disable no-undef,react/no-find-dom-node */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { View } from 'react-native';

export default class MapView extends Component {

  static propTypes = {
    initialRegion: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      latitudeDelta: PropTypes.number,
      longitudeDelta: PropTypes.number,
    }),
    region: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      latitudeDelta: PropTypes.number,
      longitudeDelta: PropTypes.number,
    }),
    onRegionChange: PropTypes.func,
    onRegionChangeComplete: PropTypes.func,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    onPanDrag: PropTypes.func,
    showsUserLocation: PropTypes.bool,
    showsMyLocationButton: PropTypes.bool,
    showsPointsOfInterest: PropTypes.bool,
    showsCompass: PropTypes.bool,
    showsScale: PropTypes.bool,
    showsBuildings: PropTypes.bool,
    showsTraffic: PropTypes.bool,
    showsIndoors: PropTypes.bool,
    toolbarEnabled: PropTypes.bool,
    moveOnMarkerPress: PropTypes.bool,
    customMapStyle: PropTypes.arrayOf(PropTypes.object),
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    style: PropTypes.any,
  };

  componentDidMount() {
    const domNode = ReactDOM.findDOMNode(this._mainView);
    const { initialRegion, customMapStyle } = this.props;
    const mapOptions = {
      center: { lat: 0, lng: 0 },
      zoom: 2,
      disableDefaultUI: true,
    };
    if (initialRegion) {
      const { latitude, longitude, latitudeDelta, longitudeDelta } = initialRegion;
      if (latitude !== null) mapOptions.center.lat = latitude;
      if (longitude !== null) mapOptions.center.lng = longitude;
      if (latitudeDelta !== null && longitudeDelta !== null)
        mapOptions.zoom = Math.max(0, Math.min(20, Math.floor(Math.min(latitudeDelta, longitudeDelta) * 300)));
    }
    domNode.onresize = () => {
      const center = this._map.getCenter();
      google.maps.event.trigger(this._map, 'resize');
      this._map.setCenter(center);
    };
    this._map = new google.maps.Map(domNode, mapOptions);
    if (customMapStyle)
      this._map.setOptions({ styles: customMapStyle });
    this._map.addListener('drag', () => {
      this._updateCurrentRegion();
      if (this.props.onRegionChange && this._currentRegion)
        this.props.onRegionChange(this._currentRegion);
      if (this.props.onPanDrag)
        this.props.onPanDrag();
    });
    this._map.addListener('zoom_changed', () => {
      this._updateCurrentRegion();
      if (this.props.onRegionChange && this._currentRegion)
        this.props.onRegionChange(this._currentRegion);
      if (this.props.onRegionChangeComplete && this._currentRegion)
        this.props.onRegionChangeComplete(this._currentRegion);
    });
    this._map.addListener('idle', () => {
      this._updateCurrentRegion();
      if (this.props.onRegionChangeComplete && this._currentRegion)
        this.props.onRegionChangeComplete(this._currentRegion);
    });
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.customMapStyle)
      this._map.setOptions({ styles: nextProps.customMapStyle });
    if (nextProps.region)
      this.animateToRegion(nextProps.region, 0);
  }

  _map = null;
  _currentRegion = null;
  _mainView = null;

  animateToCoordinate(coordinate, duration) {
    this._map.setCenter(new google.maps.LatLng(coordinate.latitude, coordinate.longitude));
  }

  animateToRegion(region, duration) {
    this._map.setCenter(new google.maps.LatLng(region.latitude, region.longitude));
    const GLOBE_WIDTH = 256;
    let angle = region.longitudeDelta;
    if (angle < 0)
      angle += 360;
    const zoom = Math.round(Math.log((960 * 360) / angle / GLOBE_WIDTH) / Math.LN2);
    this._map.setZoom(zoom);
  }

  _updateCurrentRegion = () => {
    if (!this._map) return;
    const center = this._map.getCenter();
    if (!this._map.getBounds()) return;
    const northEast = this._map.getBounds().getNorthEast();
    const southWest = this._map.getBounds().getSouthWest();
    this._currentRegion = {
      latitude: center.lat(),
      longitude: center.lng(),
      latitudeDelta: Math.abs(northEast.lat() - southWest.lat()),
      longitudeDelta: Math.abs(northEast.lng() - southWest.lng()),
    };
  };

  render() {
    const {
      initialRegion,
      region,
      onRegionChange,
      onRegionChangeComplete,
      onPanDrag,
      onPress,
      onLongPress,
      customMapStyle,
      showsUserLocation,
      showsMyLocationButton,
      showsPointsOfInterest,
      showsCompass,
      showsScale,
      showsBuildings,
      showsTraffic,
      showsIndoors,
      toolbarEnabled,
      moveOnMarkerPress,
      style,
      children,
      ...otherProps
    } = this.props;
    return (
      <View
        ref={c => {
          this._mainView = c;
        }}
        style={[style, {}]} {...otherProps}>
        {this._map && children &&
        (Array.isArray(children) ? (
            children.map(child => React.cloneElement(child, { gMap: this._map }))
        ) : (
          React.cloneElement(children, { gMap: this._map }))
        )}
      </View>
    );
  }

}

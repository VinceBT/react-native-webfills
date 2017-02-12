/*
 * @flow
 */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { View, Text } from 'react-native';
import StylePropTypes from 'react-style-proptype';

export const Marker = () => {};

export default class MapView extends Component {

  static propTypes = {
    initialRegion: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      latitudeDelta: PropTypes.number,
      longitudeDelta: PropTypes.number,
    }),
    onRegionChange: PropTypes.func,
    onRegionChangeComplete: PropTypes.func,
    onPress: PropTypes.func,
    customMapStyle: PropTypes.arrayOf(PropTypes.object),
    children: PropTypes.arrayOf(PropTypes.node),
    style: StylePropTypes.supportingArrays,
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
      if (latitudeDelta !== null && longitudeDelta !== null) {
        mapOptions.zoom = Math.max(0, Math.min(20, Math.floor(Math.min(latitudeDelta, longitudeDelta) * 300)));
      }
    }
    this._map = new google.maps.Map(domNode, mapOptions);
    if (customMapStyle) {
      this._map.setOptions({ styles: customMapStyle });
    }
    this.props.children.forEach(child => {
      const coord = child.props.coordinate;
      const title = child.props.title;
      const marker = new google.maps.Marker({
        position: { lat: coord.latitude, lng: coord.longitude },
        title,
      });
      marker.setMap(this._map);
      this._currentMarkers.set(child.key, marker);
    });
    this._map.addListener('drag', () => {
      const center = this._map.getCenter();
      const northEast = this._map.getBounds().getNorthEast();
      const southWest = this._map.getBounds().getSouthWest();
      this._currentRegion = {
        latitude: center.lat(),
        longitude: center.lng(),
        latitudeDelta: Math.abs(northEast.lat() - southWest.lat()),
        longitudeDelta: Math.abs(northEast.lng() - southWest.lng()),
      };
      if (this.props.onRegionChange) {
        this.props.onRegionChange(this._currentRegion);
      }
    });
    if (this.props.onRegionChangeComplete) {
      this._map.addListener('idle', () => {
        if (this._currentRegion) this.props.onRegionChangeComplete(this._currentRegion);
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const newCurrentChildren = new Map();
    nextProps.children.forEach(child => {
      const childKey = child.key;
      if (this._currentMarkers.has(childKey)) {
        newCurrentChildren.set(childKey, this._currentMarkers.get(childKey));
        this._currentMarkers.delete(childKey);
      } else {
        const coord = child.props.coordinate;
        const title = child.props.title;
        const marker = new google.maps.Marker({
          position: { lat: coord.latitude, lng: coord.longitude },
          title,
        });
        newCurrentChildren.set(child.key, marker);
        marker.setMap(this._map);
      }
    });
    for (const [key, marker] of this._currentMarkers) {
      marker.setMap(null);
    }
    this._currentMarkers = newCurrentChildren;
  }

  animateToCoordinate(coordinate, duration) {
    this._map.setCenter(new google.maps.LatLng(coordinate.latitude, coordinate.longitude));
    this._map.setZoom(16);
  }

  animateToRegion(region, duration) {
    this._map.setCenter(new google.maps.LatLng(region.latitude, region.longitude));
    this._map.setZoom(16);
  }

  _map = null;
  _currentMarkers = new Map();
  _currentRegion: Object = null;
  _mainView: ?View = null;

  render() {
    const { initialRegion, onRegionChange, onRegionChangeComplete, onPress, customMapStyle, style, ...otherProps } = this.props;
    return (
      <View
        ref={c => { this._mainView = c; }}
        style={[style, { alignItems: 'center', justifyContent: 'center' }]} {...otherProps}>
        <Text>{'Not implemented yet'}</Text>
      </View>
    );
  }

}

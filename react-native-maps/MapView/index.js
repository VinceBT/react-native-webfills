/*
 * global google ReactDOM
 * @flow
 */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { View, Text } from 'react-native';
import StylePropTypes from 'react-style-proptype';

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
    domNode.onresize = () => {
      const center = this._map.getCenter();
      google.maps.event.trigger(this._map, 'resize');
      this._map.setCenter(center);
    };
    this._map = new google.maps.Map(domNode, mapOptions);
    if (customMapStyle) {
      this._map.setOptions({ styles: customMapStyle });
    }
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
      if (this.props.onRegionChange) this.props.onRegionChange(this._currentRegion);
      if (this.props.onPanDrag) this.props.onPanDrag();
    });
    if (this.props.onRegionChangeComplete) {
      this._map.addListener('idle', () => {
        if (this._currentRegion) this.props.onRegionChangeComplete(this._currentRegion);
      });
    }
    this._updateMarkers(this.props.children);
  }

  componentWillUpdate(nextProps, nextState) {
    this._updateMarkers(nextProps.children);
  }

  _map = null;
  _currentMarkers = new Map();
  _currentRegion: Object = null;
  _mainView: ?View = null;

  animateToCoordinate(coordinate, duration) {
    this._map.setCenter(new google.maps.LatLng(coordinate.latitude, coordinate.longitude));
    this._map.setZoom(16);
  }

  animateToRegion(region, duration) {
    this._map.setCenter(new google.maps.LatLng(region.latitude, region.longitude));
    this._map.setZoom(16);
  }

  _updateMarkers = (nextMarkers) => {
    const newCurrentChildren = new Map();
    nextMarkers.forEach(child => {
      child.props.gMap = this._map;
      const childKey = child.key;
      const { coordinate, title, onPress } = child.props;
      if (this._currentMarkers.has(childKey)) {
        const keptChild = this._currentMarkers.get(childKey);
        keptChild.setPosition({ lat: coordinate.latitude, lng: coordinate.longitude });
        keptChild.setTitle(title);
        newCurrentChildren.set(childKey, keptChild);
        this._currentMarkers.delete(childKey);
      } else {
        /*
        const marker = new google.maps.Marker({
          position: { lat: coordinate.latitude, lng: coordinate.longitude },
          title,
        });
        newCurrentChildren.set(childKey, marker);
        marker.setMap(this._map);
        marker.addListener('click', () => {
          if (onPress) onPress();
        });
        */
      }
    });
    for (const [key, marker] of this._currentMarkers) {
      marker.setMap(null);
    }
    this._currentMarkers = newCurrentChildren;
  };

  render() {
    const {
      initialRegion,
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
      ...otherProps } = this.props;
    return (
      <View
        ref={c => { this._mainView = c; }}
        style={[style, {}]} {...otherProps}>
        {this._map && children.map(child => React.cloneElement(child, { gMap: this._map }))}
      </View>
    );
  }

}

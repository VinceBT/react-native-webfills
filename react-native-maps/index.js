/*
 * @flow
 * eslint no-undef: 0
 */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { View, Text } from 'react-native';

export class Marker extends Component {

}

export default class MapView extends Component {

  componentDidMount() {
    const domNode = ReactDOM.findDOMNode(this._mainView);
    const { initialRegion } = this.props;
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
    const map = new google.maps.Map(domNode, mapOptions);
    this.props.children.forEach(child => {
      const coord = child.props.coordinate;
      const title = child.props.title;
      const marker = new google.maps.Marker({
        position: { lat: coord.latitude, lng: coord.longitude },
        title: title,
      });
      marker.setMap(map);
    });
    map.addListener('drag', (e) => {
      console.log(e);
    });
  }

  _mainView: ?View = null;

  render() {
    const { initialRegion, style, ...otherProps } = this.props;
    return (
      <View
        ref={c => { this._mainView = c; }}
        style={[style, { alignItems: 'center', justifyContent: 'center' }]} {...otherProps}>
        <Text>{'Not implemented yet'}</Text>
      </View>
    );
  }

}

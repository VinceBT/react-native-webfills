/*
 * @flow
 * eslint no-undef: 0
 */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { View, Text } from 'react-native';

export default class MapView extends Component {

  componentDidMount() {
    const domNode = ReactDOM.findDOMNode(this._mainView);
    const { initialRegion } = this.props;
    const mapOptions = {};
    if (initialRegion) {
      mapOptions.center = { lat: initialRegion.latitude, lng: initialRegion.longitude };
      mapOptions.zoom = 8;
    } else {
      mapOptions.center = { lat: 0, lng: 0 };
      mapOptions.zoom = 2;
    }
    console.log(this.props)
    const map = new google.maps.Map(domNode, mapOptions);
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

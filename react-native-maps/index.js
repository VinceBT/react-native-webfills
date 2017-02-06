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
    const map = new google.maps.Map(domNode, {
      center: { lat: initialRegion.lat, lng: initialRegion.lng },
      zoom: 8,
    });
  }

  _mainView: ?View = null;

  render() {
    const { style, ...otherProps } = this.props;
    return (
      <View
        ref={c => { this._mainView = c; }}
        style={[style, { alignItems: 'center', justifyContent: 'center' }]} {...otherProps}>
        <Text>{'Not implemented yet'}</Text>
      </View>
    );
  }

}

/* eslint-disable no-undef */

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { View, Text } from 'react-native';

export default class Marker extends Component {

  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    gMap: PropTypes.object,
    coordinate: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
  };

  _marker = null;

  componentDidMount() {
    const { coordinate, title, onPress, children } = this.props;
    const { latitude, longitude } = coordinate;
    this._marker = null;
    if (children) {
      const CustomMarker = function (latlng, map, args) {
        this.latlng = latlng;
        this.args = args;
        this.setMap(map);
      };

      CustomMarker.prototype = new google.maps.OverlayView();

      CustomMarker.prototype.draw = function () {
        const self = this;
        let div = this.div;
        if (!div) {
          div = this.div = document.createElement('div');

          div.className = 'marker';

          div.style.position = 'absolute';
          div.style.cursor = 'pointer';

          if (typeof (self.args.marker_id) !== 'undefined') {
            div.dataset.marker_id = self.args.marker_id;
          }

          google.maps.event.addDomListener(div, 'click', (event) => {
            google.maps.event.trigger(self, 'click');
          });

          const panes = this.getPanes();
          ReactDOM.render(children[0] || children, div);
          panes.overlayImage.appendChild(div);
        }

        const point = this.getProjection().fromLatLngToDivPixel(this.latlng);

        if (point) {
          div.style.left = `${point.x-(div.offsetWidth/2)}px`;
          div.style.top = `${point.y-(div.offsetHeight/2)}px`;
        }
      };
      CustomMarker.prototype.remove = function () {
        if (this.div) {
          this.div.parentNode.removeChild(this.div);
          this.div = null;
        }
      };
      CustomMarker.prototype.getPosition = function () {
        return this.latlng;
      };
      this._marker = new CustomMarker(new google.maps.LatLng(latitude, longitude), this.props.gMap, {});
    } else {
      this._marker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: this.props.gMap,
        title,
      });
    }
    // marker is defined
    this._marker.addListener('click', () => {
      if (onPress) onPress();
    });
  }

  componentWillUnmount() {
    this._marker.setMap(null);
  }

  render() { return null; }

}

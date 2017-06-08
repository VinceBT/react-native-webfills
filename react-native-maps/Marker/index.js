/* eslint-disable no-undef,func-names,react/no-unused-prop-types,react/forbid-prop-types */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

export default class Marker extends Component {

  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    onPress: PropTypes.func,
    gMap: PropTypes.object,
    coordinate: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
  };

  componentDidMount() {
    this._rebuildMarker(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this._rebuildMarker(nextProps);
  }

  componentWillUnmount() {
    this._safeDeleteMarker();
  }

  _marker = null;

  _rebuildMarker = (props) => {
    const { latitude, longitude } = props.coordinate;
    if (props.children) {
      const reactSelf = this;
      const CustomMarker = function (latlng, map, args) {
        this.latlng = latlng;
        this.args = args;
        this.setMap(map);
      };
      CustomMarker.prototype = new google.maps.OverlayView();
      CustomMarker.prototype.draw = function () {
        let div = this.div;
        if (!div) {
          div = this.div = document.createElement('div');
          div.className = 'marker';
          div.style.position = 'absolute';
          div.style.cursor = 'pointer';
          if (typeof (this.args.marker_id) !== 'undefined')
            div.dataset.marker_id = this.args.marker_id;
          google.maps.event.addDomListener(div, 'click', (event) => {
            google.maps.event.trigger(this, 'click');
          });
          const panes = this.getPanes();
          ReactDOM.render(reactSelf.props.children[0] || reactSelf.props.children, div);
          panes.overlayImage.appendChild(div);
        }
        const point = this.getProjection().fromLatLngToDivPixel(this.latlng);
        if (point) {
          div.style.left = `${point.x - (div.offsetWidth / 2)}px`;
          div.style.top = `${point.y - (div.offsetHeight / 2)}px`;
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
      this._safeDeleteMarker();
      this._marker = new CustomMarker(new google.maps.LatLng(latitude, longitude), props.gMap, {});
    } else {
      this._safeDeleteMarker();
      this._marker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: props.gMap,
        title: props.title,
      });
    }
    this._marker.addListener('click', () => {
      if (props.onPress) props.onPress();
    });
  };

  _safeDeleteMarker = () => {
    if (this._marker)
      this._marker.setMap(null);
  };

  render() {
    return null;
  }

}

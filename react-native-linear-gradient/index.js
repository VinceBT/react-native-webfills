import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

export default class LinearGradient extends Component {

  static propTypes = {
    start: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }).isRequired,
    end: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }).isRequired,
    locations: PropTypes.arrayOf(PropTypes.number),
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  };

  render() {
    const { start, end, locations, colors, style, children, ...otherProps } = this.props;
    const vec = { x: end.x - start.x, y: -(end.y - start.y) };
    const angleRad = Math.atan(vec.y / vec.x);
    const angleDeg = Math.round((angleRad * 180) / Math.PI);
    const angleWeb = -angleDeg + 90;
    const realLocations = locations || colors.map((color, i) => (1 / (colors.length - 1)) * i);
    const colorStrings = colors.map((color, i) => `${color} ${Math.round(realLocations[i] * 100)}%`).join(', ');
    return (
      <View
        {...otherProps}
        style={[style, { backgroundImage: `linear-gradient(${angleWeb}deg, ${colorStrings})` }]}>
        {children}
      </View>
    );
  }
}

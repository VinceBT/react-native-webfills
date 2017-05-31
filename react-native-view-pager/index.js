import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Dimensions, View } from 'react-native';

export default class ViewPager extends Component {

  static propTypes = {
    initialPage: PropTypes.number,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element,
    ]),
  };

  static defaultProps = {
    initialPage: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      activePage: 0,
    };
    this._animValue = new Animated.Value(props.initialPage);
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.forceUpdate();
    });
  }

  setPage = (i) => {
    Animated.timing(this._animValue, {
      duration: 200,
      toValue: i,
    }).start();
  };

  setPageWithoutAnimation = (i) => {
    Animated.timing(this._animValue, {
      duration: 0,
      toValue: i,
    }).start();
  };

  _animValue = null;

  render() {
    const nbChildren = this.props.children.length;
    const { width: deviceWidth } = Dimensions.get('window');
    return (
      <Animated.View
        style={{
          flex: 1,
          flexDirection: 'row',
          width: deviceWidth * nbChildren,
          transform: [{
            translateX: this._animValue.interpolate({
              inputRange: [0, nbChildren],
              outputRange: [0, -deviceWidth * nbChildren],
            }),
          }],
        }}>
        {this.props.children.map((child, i) => (
          <View key={i} style={{ width: deviceWidth }}>{child}</View>
        ))}
      </Animated.View>
    );
  }

}

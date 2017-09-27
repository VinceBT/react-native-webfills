import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Dimensions, View } from 'react-native';

export default class ViewPager extends Component {

  static propTypes = {
    initialPage: PropTypes.number,
    onPageScroll: PropTypes.func,
    onPageSelected: PropTypes.func,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element,
    ]),
  };

  static defaultProps = {
    initialPage: 0,
  };

  state = {
    activePage: 0,
  };

  componentDidMount() {
    window.addEventListener('resize', this._handleWindowResize);
    this._animValue.addListener((anim) => {
      if (this.props.onPageScroll) {
        this.props.onPageScroll({
          nativeEvent: {
            position: Math.floor(anim.value),
            offset: anim.value % 1,
          },
        });
      }
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._handleWindowResize);
    clearTimeout(this._resizeTimeoutHandler);
    this._animValue.removeAllListeners();
  }

  setPage = (i) => {
    Animated.timing(this._animValue, {
      duration: 150,
      toValue: i,
    }).start();
  };

  setPageWithoutAnimation = (i) => {
    Animated.timing(this._animValue, {
      duration: 0,
      toValue: i,
    }).start();
  };

  _handleWindowResize = () => {
    clearTimeout(this._resizeTimeoutHandler);
    this._resizeTimeoutHandler = setTimeout(() => {
      this.forceUpdate();
    }, 300);
  };

  _resizeTimeoutHandler: ?number = null;
  _animValue: Animated.Value = new Animated.Value(this.props.initialPage);

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

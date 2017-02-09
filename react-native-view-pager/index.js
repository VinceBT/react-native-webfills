// @flow
import React, { Component, PropTypes } from 'react';
import { Animated, Dimensions } from 'react-native';

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

  constructor(props: Object) {
    super(props);
    this.state = {
      activePage: 0,
    };
    this._animValue = new Animated.Value(props.initialPage);
  }

  componentDidMount() {
    addEventListener('resize', () => {
      console.log('hey')
      this.forceUpdate();
    });
  }

  setPage = (i) => {
    Animated.timing(this._animValue, {
      duration: 300,
      toValue: i,
    }).start();
  };

  setPageWithoutAnimation = (i) => {
    Animated.timing(this._animValue, {
      duration: 0,
      toValue: i,
    }).start();
  };

  _animValue: Animated.Value = null;

  render() {
    const nbChildren = this.props.children.length;
    const { width: deviceWidth } = Dimensions.get('window');
    return (
      <Animated.View
        style={{ flex: 1,
          flexDirection: 'row',
          width: deviceWidth * nbChildren,
          transform: [{ translateX: this._animValue.interpolate({
            inputRange: [0, nbChildren],
            outputRange: [0, -deviceWidth * nbChildren],
          }) }],
        }}>
        {this.props.children}
      </Animated.View>
    );
  }

}

// @flow
import React, { Component, PropTypes } from 'react';
import { Animated } from 'react-native';

export default class ViewPager extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element,
    ]),
  }

  constructor(props: Object) {
    super(props);
    this.state = {
      activePage: 0,
    };
  }

  setPage = (i) => {
    this.setState({ activePage: i });
  };

  setPageWithoutAnimation = (i) => {
    this.setState({ activePage: i });
  };

  render() {
    return (
      <Animated.View style={{ flex: 1, flexDirection: 'row' }}>
        {this.props.children[this.state.activePage]}
      </Animated.View>
    );
  }

}

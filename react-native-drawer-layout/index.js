// @flow
import React, { Component } from 'react';
import { Animated, View } from 'react-native';

export default class DrawerLayout extends Component {

  static defaultProps = {
    drawerWidth: 300,
    animationDuration: 300,
  };

  static propTypes = {
    drawerWidth: React.PropTypes.number,
    animationDuration: React.PropTypes.number,
    renderNavigationView: React.PropTypes.func.isRequired,
    children: React.PropTypes.element,
  };

  constructor(props: Object) {
    super(props);
    this._closed = false;
    this._animatedWidth = new Animated.Value(this.props.drawerWidth);
  }

  _closed: boolean;
  _animatedWidth: Animated.Value;

  openDrawer = () => {
    if (this._closed) {
      this._closed = false;
      Animated.timing(this._animatedWidth, {
        toValue: this.props.drawerWidth,
        duration: this.props.animationDuration,
      }).start();
    }
  };

  closeDrawer = () => {
    if (!this._closed) {
      this._closed = true;
      Animated.timing(this._animatedWidth, {
        toValue: 0,
        duration: this.props.animationDuration,
      }).start();
    }
  };

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Animated.View
          style={{ width: this._animatedWidth, overflow: 'hidden', flexDirection: 'row', justifyContent: 'flex-end' }}>
          <View style={{ width: this.props.drawerWidth }}>
            {this.props.renderNavigationView()}
          </View>
        </Animated.View>
        <View style={{ flex: 1 }}>
          {this.props.children}
        </View>
      </View>
    );
  }

}

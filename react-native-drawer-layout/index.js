// @flow
import React, { Component, PropTypes } from 'react';
import { Animated, View, TouchableWithoutFeedback } from 'react-native';

export default class DrawerLayout extends Component {

  static defaultProps = {
    drawerBackgroundColor: 'white',
    drawerWidth: 300,
  };

  static propTypes = {
    ...View.propTypes,
    drawerBackgroundColor: PropTypes.any,
    drawerPosition: PropTypes.oneOf([]),
    drawerWidth: PropTypes.number,
    drawerLockMode: PropTypes.oneOf([
      'unlocked',
      'locked-closed',
      'locked-open',
    ]),
    onDrawerOpen: PropTypes.func,
    onDrawerClose: PropTypes.func,
    renderNavigationView: PropTypes.func.isRequired,
  };

  state = {
    open: false,
  };

  _animValue: Animated.Value = new Animated.Value(0);

  openDrawer = () => {
    if (!this.state.open) {
      this.setState({ open: true });
      Animated.timing(this._animValue, { toValue: 1, duration: 200 }).start();
    }
  };

  closeDrawer = () => {
    if (this.state.open) {
      Animated.timing(this._animValue, { toValue: 0, duration: 200 }).start(() => {
        this.setState({ open: false });
      });
    }
  };

  render() {
    const { renderNavigationView, drawerWidth, drawerBackgroundColor, style, children } = this.props;
    return (
      <View style={[style, { position: 'relative', overflow: 'hidden' }]}>
        <View style={{ flex: 1 }}>
          {children}
        </View>
        {this.state.open && (
          <TouchableWithoutFeedback onPress={() => this.closeDrawer()}>
            <Animated.View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, .65)',
                opacity: this._animValue }} />
          </TouchableWithoutFeedback>
        )}
        {this.state.open && (
          <Animated.View
            style={{
              backgroundColor: drawerBackgroundColor,
              position: 'absolute',
              top: 0,
              bottom: 0,
              width: drawerWidth,
              boxShadow: '0 0 10px 5px rgba(0, 0, 0, .8)',
              left: this._animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [-drawerWidth, 0],
              }),
            }}>
            {renderNavigationView()}
          </Animated.View>
        )}
      </View>
    );
  }

}

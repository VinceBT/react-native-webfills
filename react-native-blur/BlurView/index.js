import React from 'react';
import { View } from 'react-native';

const BlurView = ({ blurType, blurAmount, style, ...otherProps }) => {
  const colors = {
    xlight: 'rgba(255,255,255,',
    light: 'rgba(220,220,220,',
    dark: 'rgba(50,50,50,',
  };
  let backgroundColor = Object.keys(colors).indexOf(blurType) !== -1 ? colors[blurType] : colors.light;
  backgroundColor += Math.min(1, Math.max(0, blurAmount / 100)).toFixed(2);
  return (
    <View style={[style, { backgroundColor }]}{...otherProps} />
  );
};

export default BlurView;
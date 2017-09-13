import React from 'react';
import { Text } from 'react-native';

const MaterialCommunityIcon = ({ color = '#000', size = 24, style = {} }) => {
  return (
    <Text style={{ fontSize: size, color, ...style }}>{'X'}</Text>
  );
};

export default MaterialCommunityIcon;

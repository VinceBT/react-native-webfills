import React from 'react';
import { Text } from 'react-native';

/*
<link href="//fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
 */

const MaterialIcon = ({ name = 'android-arrow-back', color = '#000', size = 24, style = {} }) => {
  const actualName = name.replace('android-', '').split('-').join('_');
  return (
    <Text className="material-icons" style={{ fontSize: size, color, ...style }}>{actualName}</Text>
  );
};

export default MaterialIcon;

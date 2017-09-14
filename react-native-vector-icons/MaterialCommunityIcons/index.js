import React from 'react';
import { Text } from 'react-native';

/*
<link href="//cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/2.0.46/css/materialdesignicons.min.css" rel="stylesheet">
 */

const MaterialCommunityIcon = ({ name = 'android-arrow-back', color = '#000', size = 24, style = {} }) => {
  const actualName = name.replace('android-', '').split('_').join('-');
  return (
    <Text className={`mdi mdi-${actualName}`} style={{ fontSize: size, color, ...style }} />
  );
};

export default MaterialCommunityIcon;

// @flow

import React from 'react';

// Add <link href="//fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"> to the <head />

const MaterialIcon = ({ name = 'android-arrow-back', color = '#000', size = 24, style = {} }) => {
  const actualName = name.replace('android-', '').split('-').join('_');
  return (
    <i className="material-icons" style={{ fontSize: size, color, ...style }}>{actualName}</i>
  );
};

export default MaterialIcon;
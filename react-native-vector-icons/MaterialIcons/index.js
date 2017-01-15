// @flow
import React from "react";

export default ({name = 'android-arrow-back', color = '#000', size = 24, style = {}}) => {
  const actualName = name.replace('android-', '').split('-').join('_');
  return (
    <i className="material-icons" style={{ fontSize: size, color, ...style }}>{actualName}</i>
  );
};

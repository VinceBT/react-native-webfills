import React from 'react';
import { View } from 'react-native';

const StubComponent = (props) => {
  return <View {...props} />;
};

export const Bar = StubComponent;
export const Pie = StubComponent;
export const Circle = StubComponent;
export const CircleSnail = StubComponent;

const Progress = {
  Bar,
  Pie,
  Circle,
  CircleSnail,
};

export default Progress;

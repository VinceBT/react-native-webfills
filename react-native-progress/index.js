import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const StubComponent = (props) => {
  return <View {...props} />;
};

export const Bar = StubComponent;
export const Pie = StubComponent;
export const Circle = StubComponent;
export const CircleSnail = (props) => { return <ActivityIndicator {...props} />; };

const Progress = {
  Bar,
  Pie,
  Circle,
  CircleSnail,
};

export default Progress;

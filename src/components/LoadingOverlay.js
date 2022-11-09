import React from 'react';
import { View, ActivityIndicator, Dimensions } from 'react-native';
import { styled } from 'react-native-base-components';

const Container = styled(View, ({ theme }) => ({
  zIndex: -1,
  position: 'absolute',
  width: Dimensions.get('screen').width,
  height: Dimensions.get('screen').height,
  backgroundColor: theme.colors.background,
  justifyContent: 'center',
}));

const LoadingOverlay = ({ style }) => {
  return (
    <Container style={style}>
      <ActivityIndicator />
    </Container>
  );
};

export default LoadingOverlay;

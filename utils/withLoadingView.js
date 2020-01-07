import React from 'react';
import { View, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { connect } from 'react-redux';

const withLoadingView = (Component, { label }) => {
  const WrappedComponent = props => {
    const { loading, forwardRef, ...restProps } = props;
    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    }
    return <Component {...restProps} ref={forwardRef} />;
  }

  const mapProps = state => ({
    loading: state.ui.pendingRequests[label],
  });
  const ConnectedComponent = connect(mapProps)(WrappedComponent);
  return React.forwardRef((props, ref) => {
    return <ConnectedComponent {...props} forwardRef={ref} />;
  });
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: -1,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
});

export default withLoadingView;
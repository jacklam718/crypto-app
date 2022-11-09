import React from 'react';
import { View, StyleSheet } from 'react-native';

const SIZE = 12;

const Cursor = (props) => {
  let offsetX = props.x;
  if (offsetX < 0) {
    offsetX = 0;
  } else if (props.x >= props.width) {
    offsetX = props.width;
  }

  return (
    <View
      style={[
        styles.cursor,
        {
          top: props.y - SIZE / 2,
          left: offsetX - SIZE / 2,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  cursor: {
    position: 'absolute',
    width: SIZE,
    height: SIZE,
    borderWidth: 3,
    backgroundColor: '#fff',
    borderColor: '#1301FF',
    borderRadius: 6,
  },
});

export default Cursor;

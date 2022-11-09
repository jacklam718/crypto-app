import { useEffect, useRef } from 'react';
import { View, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { TextBlock } from 'react-native-base-components/src/typography';
import { useTheme } from 'react-native-base-components';

const PADDING = 20;
const SCREEN_WIDTH = Dimensions.get('window').width - PADDING;

const Segment = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={{
        flex: 1,
        borderRadius: 16,
        padding: 16,
        marginVertical: 16,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </TouchableOpacity>
  );
};

const SegmentedControl = ({ values, selectedIndex = 0, onChange }) => {
  const theme = useTheme();
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: selectedIndex * (SCREEN_WIDTH / values.length),
      useNativeDriver: true,
    }).start();
  }, [selectedIndex]);

  return (
    <View
      style={{
        width: SCREEN_WIDTH,
        alignSelf: 'center',
      }}
    >
      <View style={{ flexDirection: 'row' }}>
        {values.map((value, index) => (
          <Segment key={index} onPress={() => onChange(index)}>
            <TextBlock
              style={{
                color:
                  index === selectedIndex
                    ? theme.colors.segmentedControlSelectedText
                    : theme.colors.contentPrimary,
              }}
            >
              {value}
            </TextBlock>
          </Segment>
        ))}
      </View>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          zIndex: -1,
          width: SCREEN_WIDTH / values.length,
          justifyContent: 'center',
          transform: [{ translateX }],
        }}
      >
        <View
          style={{
            padding: 16,
            borderRadius: 16,
            backgroundColor: theme.colors.segmentedControlSelectedFill,
          }}
        />
      </Animated.View>
    </View>
  );
};

export default SegmentedControl;

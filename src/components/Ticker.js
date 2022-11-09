import { useEffect, useRef } from 'react';
import { Text, View, Animated } from 'react-native';

const Digit = ({ digit, size, style }) => {
  const digitRef = useRef();
  const digitAnim = useRef(
    new Animated.Value(-(size * parseInt(digit, 10)))
  ).current;

  useEffect(() => {
    Animated.spring(digitAnim, {
      toValue: -(size * parseInt(digit, 10)),
      useNativeDriver: true,
    }).start();
  }, [digit]);

  return (
    <View ref={digitRef}>
      <Animated.View style={{ transform: [{ translateY: digitAnim }] }}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <Animated.Text key={num} style={style}>
            {num}
          </Animated.Text>
        ))}
      </Animated.View>
      <Text style={{ opacity: 0 }}>a</Text>
    </View>
  );
};

const Ticker = ({ prefix, number, size = 36, style }) => {
  const textStyle = [style, { fontSize: size, lineHeight: size }];
  return (
    <View
      style={{
        height: size,
        margin: 'auto',
        overflow: 'hidden',
        flexDirection: 'row',
      }}
    >
      {prefix && <Text style={textStyle}>{prefix}</Text>}
      {number
        .toString()
        .split('')
        .map((digit, idx) =>
          digit === '.' ? (
            <Text key={idx} style={textStyle}>
              .
            </Text>
          ) : (
            <Digit key={idx} digit={digit} size={size} style={textStyle} />
          )
        )}
    </View>
  );
};

export default Ticker;

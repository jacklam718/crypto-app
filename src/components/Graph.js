import React, { useState, useMemo } from 'react';
import { View, PanResponder } from 'react-native';
import { Svg, LinearGradient, Stop, Path } from 'react-native-svg';
import { useTheme } from 'react-native-base-components';
import * as shape from 'd3-shape';
import * as scale from 'd3-scale';
import * as array from 'd3-array';

const STROKE_WIDTH = 2;

const Graph = ({
  width,
  height,
  data = [],
  curve = 'curveBasis',
  contentInset = {},
  onDataHover = () => {},
}) => {
  const theme = useTheme();
  const { left = 0, right = 0, top = 0, bottom = 0 } = contentInset;

  const xScale = scale
    .scaleLinear()
    .domain([data[0].x, data[data.length - 1].x])
    .range([left, width - right]);

  const yScale = scale
    .scaleLinear()
    .domain([array.min(data, ({ y }) => y), array.max(data, ({ y }) => y)])
    .range([height - bottom, top]);

  const area = shape
    .area()
    .x((d) => xScale(d.x))
    .y0(yScale(array.min(data, () => 0)))
    .y1((d) => yScale(d.y))
    .curve(shape[curve])(data);

  const line = shape
    .line()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y))
    .curve(shape[curve])(data);

  return (
    <Interaction data={data} xScale={xScale} onDataHover={onDataHover}>
      {({ x, focus }) => (
        <>
          <Svg height={height} width={width}>
            <LinearGradient
              id="gradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2={height}
              gradientUnits="userSpaceOnUse"
            >
              <Stop
                offset="0"
                stopColor={theme.colors.graphAreaFill}
                stopOpacity="0.3"
              />
              <Stop
                offset="1"
                stopColor={theme.colors.graphAreaFill}
                stopOpacity="0"
              />
            </LinearGradient>
            <Path d={area} fill="url(#gradient)" />
            <Path
              d={line}
              width={width}
              height={height}
              stroke={theme.colors.graphStrokeFill}
              strokeWidth={STROKE_WIDTH}
              fill="none"
            />
          </Svg>
          {focus && (
            <View
              style={{
                left: x,
                position: 'absolute',
                width: STROKE_WIDTH,
                height: '100%',
                backgroundColor: theme.colors.graphBarFill,
              }}
            />
          )}
        </>
      )}
    </Interaction>
  );
};

const Interaction = ({ children, onDataHover, data, xScale }) => {
  const [{ x, y, focus }, setState] = useState({ x: 0, y: 0, focus: false });

  const getNearestItem = (x) => {
    let nearestItem = null;
    let minDistance = Infinity;
    data.forEach((item) => {
      const coordinate = xScale(item.x);
      const newDistance = Math.abs(coordinate - x);
      if (newDistance < minDistance) {
        minDistance = newDistance;
        nearestItem = item;
      }
    });
    return nearestItem;
  };

  const panResponder = useMemo(() => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (_, { x0: x, y0: y }) => {
        setState(() => {
          onDataHover(getNearestItem(x));
          return { x, y, focus: true };
        });
      },
      onPanResponderMove: (_, { moveX: x, moveY: y }) => {
        setState((prev) => {
          onDataHover(getNearestItem(x));
          return { ...prev, x, y };
        });
      },
      onPanResponderEnd: () => {
        setState((prev) => {
          onDataHover(null);
          return { ...prev, focus: false };
        });
      },
    });
  }, [data]);

  return <View {...panResponder.panHandlers}>{children({ x, y, focus })}</View>;
};

export default Graph;

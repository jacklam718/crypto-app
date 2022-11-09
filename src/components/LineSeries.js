import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';
import * as scale from 'd3-scale';
import * as array from 'd3-array';
import * as shape from 'd3-shape';

const LineSeries = (props) => {
  const { data } = props;
  if (!data.length) {
    return null;
  }
  const {
    width,
    height,
    curve,
    minX = data[0].x,
    maxX = data[data.length - 1].x,
    minY = array.min(data, ({ y }) => y),
    maxY = array.max(data, ({ y }) => y),
    contentInset: { left = 0, right = 0, top = 0, bottom = 0 },
    ...svg
  } = props;

  const xScale = scale
    .scaleLinear()
    .domain([minX, maxX])
    .range([left, width - right]);

  const yScale = scale
    .scaleLinear()
    .domain([minY, maxY])
    .range([height - bottom, top]);

  const line = shape
    .line()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y))
    .curve(shape[curve])(data);

  return (
    <Svg width={width} height={height}>
      <Path d={line} width={width} height={height} {...svg} />
    </Svg>
  );
};

LineSeries.defaultProps = {
  curve: 'curveLinear',
  contentInset: {},
  fill: 'transparent',
  stroke: '#fff',
  strokeWidth: 2,
};

export default memo(LineSeries);

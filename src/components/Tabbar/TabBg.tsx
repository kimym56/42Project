import React from "react"
import Svg, { Path, SvgProps } from "react-native-svg";

type Props = SvgProps & {
  color?: string;
};

export const TabBg: React.FC<Props> = ({
  color = '#FFFFFF',
  ...props
}) => {
  return (
    <Svg
      width='100%'
      height='100%'
      viewBox="0 0 140 50"
      preserveAspectRatio="xMidYMid meet"
      {...props}
    >
      <Path
        d="M 136.503 18.991 V 94.706 H 0 V 19 C 18.004 19.034 33.136 39.448 33.1 51.978 C 33.329 74.569 52.173 87.075 68.697 86.932 C 83.437 87.075 103.143 75.001 103.397 52.197 C 103.363 40.117 118.059 18.988 136.497 18.988"
        fill={color}
        stroke={'blue'}
        strokeWidth={1.5}
      />
    </Svg>
  )
};
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
      viewBox="0 0 140 78"
      preserveAspectRatio="xMidYMid meet"
      {...props}
    >
      <Path
        d="M 140 0 V 78 H 0 V 0 C 20 0 34 20 34 34 C 34 50 45 70 70 70 C 95 70 106 50 106 34 C 106 20 120 0 140 0"
        fill={color}
        // stroke={'black'}
        // strokeWidth={1.5}
      />
    </Svg>
  )
};
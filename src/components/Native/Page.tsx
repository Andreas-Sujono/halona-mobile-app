import React, { memo } from 'react';
import { View as RNView, ViewProps, ScrollView as RNScrollView } from 'react-native';
import { useAppSelector } from 'Store';
import { selectColors } from 'Store/Selector/auth/theme';
import { ColorType } from 'utils/colors';

function Page({
  children,
  bgColor = 'primary',
  enableScroll = false,
  ...props
}: {
  children?: React.ReactElement | React.ReactElement[];
  bgColor?: ColorType;
  enableScroll?: boolean;
} & ViewProps) {
  const colors = useAppSelector(selectColors);
  const selectedColor = colors[bgColor];
  const injectedStyle = props.style && props.style instanceof Array ? props.style : [props.style];
  const Node = enableScroll ? RNScrollView : RNView;
  return (
    <Node
      {...props}
      style={[
        ...injectedStyle,
        {
          backgroundColor: selectedColor,
          flex: 1,
        },
      ]}
    >
      {children}
    </Node>
  );
}

export default memo(Page);

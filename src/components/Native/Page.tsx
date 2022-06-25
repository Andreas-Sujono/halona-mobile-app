import React, { memo } from 'react';
import { View as RNView, ViewProps } from 'react-native';
import { useAppSelector } from 'Store';
import { selectColors } from 'Store/Selector/auth/theme';
import { ColorType } from 'utils/colors';

function Page({
  children,
  bgColor = 'primary',
  ...props
}: { children?: React.ReactElement | React.ReactElement[]; bgColor?: ColorType } & ViewProps) {
  const colors = useAppSelector(selectColors);
  const injectedStyle = props.style && props.style instanceof Array ? props.style : [props.style];
  const selectedColor = colors[bgColor];
  return (
    <RNView
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
    </RNView>
  );
}

export default memo(Page);
